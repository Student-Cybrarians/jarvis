# JARVIS — Design System

## Visual direction

Cinematic technical command center: dark surfaces, restrained glass/hud panels, cyan/blue sensing language, violet secondary instrumentation, green healthy state, amber warning, red critical state.

## Core principle

Animation represents backend state. It is not decorative noise.

## Core states

- IDLE
- SCANNING
- HUMAN_DETECTED
- STANDING
- WALKING
- RUNNING
- SITTING
- FALL
- DEGRADED
- OFFLINE

## Visual mappings

- system.online → Core wake/breathe.
- sensor.connected → sensor node illuminates.
- human.detected → Core expands and confidence appears.
- human.lost → Core contracts.
- activity.walking → directional signal wave.
- activity.running → faster pulse.
- activity.sitting → slow pulse.
- activity.fall → critical sweep.
- alert.created → alert enters with high-salience motion.
- csi.signal → waveform reacts.
- model.inference → confidence counter updates.

## Accessibility

Respect prefers-reduced-motion. Provide text/state labels for every animated state.

## Layout

Primary: central Core + signal visualization.
Secondary: presence/activity/health panels.
Tertiary: event timeline and alert history.

Use existing project tokens before introducing new global tokens.
