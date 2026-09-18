import asyncio
import json
import urllib.request

# Placeholder simulator for local contract testing.
# The first implementation intentionally keeps transport-independent
# event generation in app.events so real CSI can replace this module.


def health_url(base_url: str) -> str:
    return f"{base_url.rstrip('/')}/health"


async def main() -> None:
    print("JARVIS CSI simulator ready.")
    print("Connect a WebSocket client to /ws to exercise the realtime contract.")
    while True:
        await asyncio.sleep(3600)


if __name__ == "__main__":
    asyncio.run(main())
