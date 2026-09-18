# JARVIS — Architecture

## System boundary

The React/Tauri frontend is a presentation client. CSI ingestion, preprocessing, feature extraction, ML inference, persistence, and event distribution remain backend concerns.

## Runtime flow

Wi-Fi/CSI hardware
→ CSI worker
→ preprocessing
→ feature extraction
→ ML inference
→ domain event
→ Redis Streams
→ realtime WebSocket hub
→ React/Zustand
→ JARVIS visual state

REST is used for durable queries and commands. WebSocket is used for live state. PostgreSQL stores durable application records. High-volume raw CSI should be sampled/windowed or stored in a time-series/object-storage path rather than as ordinary transactional rows.

## Initial stack

- Frontend: existing React 19 + TypeScript + Vite + Zustand + Motion + Tauri.
- API: FastAPI + Pydantic.
- Realtime: WebSocket.
- Event transport: Redis Streams.
- Database: PostgreSQL.
- ML/CSI: Python.
- Testing: Vitest, Pytest, Playwright.
- Packaging: Docker.
- Edge/web delivery: Cloudflare or Vercel for the frontend; backend remains an origin service with private CSI access.

## Contract boundary

The frontend consumes versioned domain events, never implementation-specific CSI frames.

Required event metadata:

- event
- event_version
- event_id
- sequence
- timestamp
- device_id

## Failure model

connected → degraded → disconnected → reconnecting.

The UI must expose degraded sensing rather than presenting stale data as current.
