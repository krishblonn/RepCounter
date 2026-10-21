---
doc: scope
status: approved
---

# RepCounter

A browser-based exercise rep counter and form checker using webcam pose estimation.

## The Unique Kernel
Real-time pose estimation via MediaPipe in the browser powering a config-driven state machine that accurately tracks joint angles and counts reps (push-ups, squats, bicep curls) with live posture feedback and skeleton overlay—entirely client-side with zero server dependencies.

## Who It's For
Fitness enthusiasts and home workout practitioners who want instant, automated rep counting and form feedback using just a standard laptop webcam without needing wearables or paid subscription apps.

## The Core Loop
The user selects an exercise, aligns themselves in front of their webcam with a live skeleton overlay, performs repetitions while receiving real-time posture warnings and live rep counts, and views their set summary and history upon completion.

## Inspiration & Identity
Clean, functional fitness HUD overlay aesthetic: clear large typography, high-contrast status indicators (green/yellow/red), and responsive feedback designed to be readable while moving.

## Why This Matters to the Learner
Getting a cool project working end-to-end, learning how computer vision (MediaPipe) and state machines work in practice.

## What "Working" Looks Like
Opening the app in a browser, enabling the webcam, seeing the live skeleton tracker draw over the body, performing squats or push-ups, and watching the rep counter accurately increment with live form feedback and a completion summary.

## The POC Boundary
- MediaPipe Pose integration running locally in browser.
- Three supported exercises: Push-ups, Squats, Bicep curls (config-driven angles/rules).
- Finite state machine for "up" / "down" rep counting with temporal smoothing (moving average).
- Live form checks & warnings (e.g. back straight, knees inward, arm swing).
- Live skeleton overlay and set summary screen with local storage history.
- Unit tests for angle calculation and state machine logic.

## Later
- Multi-person tracking and auto-person selection.
- Audio cue sounds for form warnings.
- Custom exercise configuration creator UI.

## Explicitly Cut
- Cloud user authentication and database sync (saving to browser local storage only).
- Mobile native apps (browser-only MVP).
- Social leaderboards and sharing features.
