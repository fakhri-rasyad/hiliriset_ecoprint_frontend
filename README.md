# Ecoprint Frontend

A real-time monitoring dashboard for the Hiliriset ecoprint fabric boiling process, built with React + TypeScript + Vite.

## Tech Stack

- **React 19** + **TypeScript** — UI and type safety
- **Vite** — fast dev server and build tooling
- **Tailwind CSS** — utility-first styling
- **TanStack Query** — REST API data fetching, caching, and mutations
- **Zustand** — global state management (auth, live telemetry, toasts)
- **React Router v6** — client-side routing with auth-protected routes
- **Apache ECharts** (`echarts-for-react`) — telemetry history charts
- **Axios** — HTTP client with JWT interceptor

## Features

- **Authentication** — login and register with JWT, auto-logout on token expiry
- **Dashboard** — live stats for active sessions, ESP devices, and kompors
- **Sessions** — create, list, search, and filter boiling sessions
- **Live Monitoring** — real-time telemetry (water temp, air temp, humidity) via WebSocket with countdown timer
- **Session History** — line chart of recorded telemetry with avg and peak stats
- **ESP Devices** — register and delete ESP devices
- **Kompors** — register and delete kompors
- **Toast notifications** — success, error, and info feedback
- **Confirmation dialogs** — before destructive actions

## Architecture

```
React Frontend (port 5173 dev / port 80 prod)
        │
        ├── REST API (TanStack Query + Axios)
        │         └── GET /api/v1/sessions, /esps, /kompors ...
        │
        └── WebSocket (native WS)
                  └── ws://host/api/v1/sessions/:id/ws
```

## Project Structure

```
src/
├── api/              # Axios instance + REST endpoint functions
│   ├── axios.ts      # Base Axios instance with JWT interceptor
│   ├── auth.ts       # login, register
│   ├── esps.ts       # CRUD ESP devices
│   ├── kompors.ts    # CRUD kompors
│   └── sessions.ts   # Sessions + records
├── components/
│   ├── charts/       # ECharts wrappers
│   ├── session/      # Session-specific components
│   ├── device/       # Device-specific components
│   ├── ui/           # Shared UI (Toast, ConfirmDialog)
│   └── Layout.tsx    # Sidebar + main layout
├── hooks/
│   ├── useWebSocket.ts    # Native WS connection
│   └── useCountdown.ts    # Live countdown timer
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Sessions.tsx
│   ├── SessionLive.tsx
│   └── SessionHistory.tsx
├── store/
│   ├── authStore.ts      # JWT token + username
│   ├── sessionStore.ts   # Live telemetry readings
│   └── toastStore.ts     # Toast notifications
├── types/
│   ├── api.ts        # Generic ApiResponse<T>
│   ├── auth.ts       # Auth request/response types
│   ├── esp.ts        # ESP device types
│   ├── kompor.ts     # Kompor types
│   └── session.ts    # Session, SessionRecord, WsMessage types
├── lib/
│   └── queryClient.ts    # TanStack Query client
└── router/
    └── index.tsx         # Routes + PrivateRoute guard
```

## Prerequisites

- Node.js 22+
- npm 10+
- Hiliriset Ecoprint backend running (see backend README)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ecoprint-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | Base URL of the Go backend | `http://localhost:3000` |

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## WebSocket Message Format

Live telemetry pushed every 2 seconds:
```json
{ "air_temp": 36.5, "water_temp": 98.2, "humidity": 72.1 }
```

Session finished event:
```json
{ "event": "finished" }
```

## Related Repositories

- [Hiliriset Ecoprint Backend](../golang_backend) — Go + Fiber + PostgreSQL + MQTT

## License

MIT