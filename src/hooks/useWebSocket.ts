import { useEffect, useRef } from 'react'
import type { WsMessage } from '../types/session'

interface UseWebSocketOptions {
  onMessage: (data: WsMessage) => void
  onFinished: () => void
}

export function useWebSocket(sessionId: string, options: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null)
  const { onMessage, onFinished } = options

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:3000/api/v1/sessions/${sessionId}/ws`
    )
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      try {
        const data: WsMessage = JSON.parse(event.data)
        if ('event' in data && data.event === 'finished') {
          onFinished()
        } else {
          onMessage(data)
        }
      } catch {
        console.error('Failed to parse WS message:', event.data)
      }
    }

    ws.onerror = (err) => {
      console.error('WebSocket error:', err)
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
    }

    return () => {
      ws.close()
    }
  }, [sessionId])
}