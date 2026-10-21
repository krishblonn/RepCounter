---
doc: scope
status: approved
---

# RepCounter

A browser-based exercise rep counter, form checker, and **Daily Task Routine** workout system using webcam pose estimation.

## The Unique Kernel
Real-time pose estimation via MediaPipe in the browser powering a config-driven state machine that accurately tracks joint angles and counts reps (push-ups, squats, bicep curls) with live posture feedback, automated multi-exercise routine queues, and rest timers—entirely client-side with zero server dependencies.

## Who It's For
Fitness enthusiasts and home workout practitioners who want structured daily workout routines with automated rep counting and rest intervals using just a standard laptop webcam.

## The Core Loop
The user configures or loads their Daily Task Routine targets (Push-ups, Squats, Bicep Curls), aligns themselves in front of their webcam, performs exercises with live rep counting and form feedback, automatically transitions through 2-minute rest timers between exercises, and views their completed daily routine summary and history.

## Inspiration & Identity
Clean, functional fitness HUD overlay aesthetic: clear large typography, high-contrast status indicators (green/yellow/red), and responsive feedback designed to be readable while moving.

## Why This Matters to the Learner
Getting a cool project working end-to-end, learning how computer vision (MediaPipe), state machines, and routine sequencing/timers work in practice.

## What "Working" Looks Like
Opening the app in a browser, setting up a Daily Task Routine targets, enabling the webcam, performing exercises sequentially with automated rest timers, and watching the routine summary save to local history.

## The POC Boundary
- MediaPipe Pose integration running locally in browser.
- Three supported exercises: Push-ups, Squats, Bicep curls (config-driven angles/rules).
- Finite state machine for "up" / "down" rep counting with temporal smoothing.
- Daily Task Routine setup and persistent target management in localStorage.
- Auto-advance sequence: Exercise -> 2-Minute Rest Timer (with skip button) -> Next Exercise.
- Routine summary screen and local history.
- Unit tests for angle calculation, state machine, and routine progression logic.

## Later
- Multi-person tracking and auto-person selection.
- Audio cue sounds for form warnings and rest timer alarms.
- Custom exercise configuration creator UI.

## Explicitly Cut
- Cloud user authentication and database sync (saving to browser local storage only).
- Mobile native apps (browser-only MVP).
- Social leaderboards and sharing features.
