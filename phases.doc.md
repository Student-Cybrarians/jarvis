# JARVIS — Delivery Phases

## Phase 1 — Foundation

- Project documents.
- Shared event contracts.
- Backend skeleton.
- Database schema.
- Environment configuration.

## Phase 2 — JARVIS dashboard

- Central animated Core.
- Presence status.
- Activity state.
- Signal waveform.
- Sensor health.
- Alerts.
- System telemetry.

Mock events are acceptable during this phase.

## Phase 3 — Realtime backend

- FastAPI.
- Redis Streams.
- WebSocket hub.
- Authentication.
- Reconnection and resubscription.
- Event ordering.

## Phase 4 — CSI simulator

Support:

idle, human-enter, standing, walking, sitting, running, fall, human-leave.

The simulator must emit the same domain events as production inference.

## Phase 5 — Real CSI + ML

Replace the simulator with the actual CSI receiver and inference pipeline without changing the frontend event contract.

## Phase 6 — Production

- Persistent history.
- Alerts.
- Analytics.
- Device management.
- Observability.
- Model versioning.
- Deployment.
- Backups and operational runbooks.

## Release gate

Do not call the sensing system production-ready until the simulator → API → WebSocket → UI end-to-end test passes and reconnect/stale-event behavior is verified.
