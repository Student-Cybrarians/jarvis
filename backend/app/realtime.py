from fastapi import WebSocket


class ConnectionHub:
    def __init__(self) -> None:
        self.connections: set[WebSocket] = set()

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.connections.add(websocket)
        await websocket.send_json({
            "event": "system.online",
            "event_version": 1,
            "event_id": "bootstrap",
            "sequence": 0,
            "timestamp": "bootstrap",
            "device_id": "system",
        })

    def disconnect(self, websocket: WebSocket) -> None:
        self.connections.discard(websocket)

    async def broadcast(self, event: dict) -> None:
        dead: list[WebSocket] = []
        for websocket in self.connections:
            try:
                await websocket.send_json(event)
            except Exception:
                dead.append(websocket)
        for websocket in dead:
            self.disconnect(websocket)


hub = ConnectionHub()
