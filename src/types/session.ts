export interface Session {
  public_id: string
  esp_id: string
  kompor_id: string
  finished_at: string
  created_at: string
}

export interface SessionRecord {
  id: number
  session_id: string
  air_temp: number
  water_temp: number
  humidity: number
  recorded_at: string
}

export interface TelemetryMessage {
  air_temp: number
  water_temp: number
  humidity: number
}

export interface WsFinishedEvent {
  event: 'finished'
}

export type WsMessage = TelemetryMessage | WsFinishedEvent