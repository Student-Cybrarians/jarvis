from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .realtime import hub

app = FastAPI(title="JARVIS Sensing API", version="0.1.0")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "jarvis-sensing-api"}


@app.get("/api/v1/system")
async def system() -> dict[str, str]:
    return {"status": "online", "realtime": "websocket"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await hub.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        hub.disconnect(websocket)
