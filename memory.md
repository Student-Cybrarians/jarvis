# JARVIS — Project Memory

## Current state

The repository is an existing React 19 + TypeScript + Vite + Tauri application. It already contains routing, Zustand state, API helpers, SSE infrastructure, dashboard components, and desktop integration.

## Current work

Transform the dashboard into the Wi-Fi sensing JARVIS command interface while preserving existing OpenJarvis functionality.

## Decisions

1. Keep the existing frontend shell.
2. Add a sensing domain rather than replacing the application.
3. Use versioned domain events between backend and frontend.
4. Build against a simulator before physical CSI hardware.
5. Keep CSI/ML processing in Python.
6. Use WebSocket for live UI state and REST for durable queries.

## Next implementation sequence

1. Shared event contract.
2. Realtime client/state adapter.
3. JARVIS Core state machine.
4. FastAPI backend skeleton.
5. Redis event path.
6. CSI simulator.
7. End-to-end tests.
8. Real CSI integration.
9. Deployment and observability.

## Deployment note

The current Vercel team has a project named student-cybrarians-jarvis, but that project is linked to a different GitHub repository: Student-Cybrarians/projects. It must not be treated as the deployment target for this repository without explicit relinking.
