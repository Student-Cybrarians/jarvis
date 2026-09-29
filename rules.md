# JARVIS — Engineering Rules

## What to use

- TypeScript and strict typing on the frontend.
- Existing React/Tauri architecture; evolve rather than rewrite.
- Zustand for realtime UI state.
- Motion/CSS/SVG for JARVIS animation.
- FastAPI/Pydantic for the sensing API.
- PostgreSQL for durable records.
- Redis Streams for realtime distribution.
- WebSocket for live client state.
- OpenAPI for REST contracts.
- Versioned JSON event schemas for realtime contracts.
- Vitest/Pytest/Playwright for tests.
- Docker for reproducible services.

## What to avoid

- Do not put CSI processing inside React.
- Do not expose CSI ingestion directly to the public Internet.
- Do not persist every raw CSI sample as a normal PostgreSQL row.
- Do not let individual animation components invent application state.
- Do not duplicate API/event types manually when a generated/shared contract is available.
- Do not introduce microservices without a measured boundary.

## Error handling

All external calls must have explicit loading, stale, degraded, and failure states. Network errors must be observable and user-facing where they affect sensing.

## AI boundaries

ML may infer presence/activity from supplied signal data. It must expose confidence and model provenance. It must not fabricate sensor readings, historical events, or certainty.

## Security

- Authenticate human clients.
- Use separate device authentication.
- Validate all payloads.
- Keep secrets out of source and logs.
- Use TLS in deployed environments.
- Audit privileged commands.

## Performance

Realtime UI updates must be throttled/downsampled where necessary. Raw CSI visualization should use batched/binary transport if JSON becomes a bottleneck.

## Accessibility

Respect prefers-reduced-motion and maintain readable contrast. Motion must communicate state, not be the only indication of state.
