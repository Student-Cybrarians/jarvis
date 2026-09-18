from datetime import datetime, timezone
from uuid import uuid4


def make_human_detected(
    *,
    sequence: int,
    device_id: str,
    count: int,
    confidence: float,
) -> dict:
    return {
        "event": "human.detected",
        "event_version": 1,
        "event_id": f"evt_{uuid4().hex[:16]}",
        "sequence": sequence,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "device_id": device_id,
        "presence": {"count": count, "confidence": confidence},
    }
