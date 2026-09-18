# JARVIS — Product Requirements Document

## 1. What to build

JARVIS is a real-time Wi-Fi CSI human-detection command interface. It turns CSI/sensor telemetry and ML inference into an operator-facing visual system that answers: who/what is detected, how confident the model is, what activity is occurring, and whether the sensing infrastructure is healthy.

## 2. Target users

- Operators monitoring a physical space.
- Researchers evaluating Wi-Fi sensing and activity-recognition models.
- Developers integrating CSI hardware and inference pipelines.

## 3. Core capabilities

- Real-time human presence/occupancy detection.
- Activity classification with confidence.
- Live CSI/signal visualization.
- Sensor/device health.
- Alerts and acknowledgement.
- Activity timeline and historical queries.
- Model/version and inference telemetry.
- Simulator mode before physical CSI hardware.
- Desktop delivery through the existing Tauri shell.
- Browser delivery for the web dashboard.

## 4. Non-goals

- Camera-based identification.
- Silent collection of raw CSI outside an explicitly configured sensing pipeline.
- Treating model predictions as ground truth without confidence and provenance.

## 5. Success criteria

A simulator event must travel through the same contracts used by real CSI hardware and cause the JARVIS Core to transition state in real time without frontend changes.

Primary vertical slice:

CSI simulator → API → event bus → WebSocket → client state → JARVIS Core.
