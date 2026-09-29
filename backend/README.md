# JARVIS Sensing Backend

Local development:

    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn app.main:app --reload --port 8000

WebSocket endpoint:

    ws://localhost:8000/ws

Health endpoint:

    GET http://localhost:8000/health

Set the frontend variable:

    VITE_JARVIS_WS_URL=ws://localhost:8000/ws

This foundation intentionally keeps CSI/ML transport-independent. The real CSI worker will publish the same versioned domain events consumed by the WebSocket layer.
