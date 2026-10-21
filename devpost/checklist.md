---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Dashboard, Exercise Selection & Storage Foundation**
  Becomes usable: The home dashboard opens with exercise selection cards and history.
  Commit: `Add dashboard UI, exercise cards, history, and storage module`

- [x] **2. MediaPipe Pose Integration, Skeleton Overlay & Error Handling**
  Becomes usable: Webcam feed, MediaPipe Pose, skeleton overlay, and error warnings.
  Commit: `Integrate MediaPipe Pose, skeleton canvas overlay, and error warnings`

- [x] **3. Joint Angle Calculations, State Machine Rep Counting & Form Rules**
  Becomes usable: Rep counting for Push-ups, Squats, and calibrated Bicep Curls with form rules.
  Commit: `Implement angle math, state machine rep counter, and form rules`

- [x] **4. Set Summary Modal, Stop Action & End-to-End Polish**
  Becomes usable: Set summary modal, unit tests, and README.
  Commit: `Add set summary modal, completion flow, unit tests, and README`

- [x] **5. Daily Task Routine, Setup Screen, Rest Timer & Auto-Advance**
  Becomes usable: Daily Task Setup interface (saving targets to localStorage), routine queue runner (Push-ups -> Squats -> Bicep Curls), 2-minute countdown rest timer with Skip button, auto-advance logic, and routine completion summary.
  Why now: Delivers the major requested daily routine workflow.
  PRD ref: `prd.md > The Core Journey` (steps 1-4)
  Spec ref: `spec.md > Components` (Daily Task Setup & Routine Manager)
  Build: Create `src/routine.js` to manage routine state, targets persistence, and rest timer intervals. Add Setup modal and Rest Timer overlay to `index.html`. Update unit tests in `tests/test.html`.
  Verify (mechanical): Configure daily routine targets in setup, start routine, verify auto-advance and rest timer functionality.
  Learner check: Test configuring a short routine and experiencing the rest timer and auto-advance flow.
  Commit: `Add Daily Task Routine setup, queue auto-advance, and 2-minute rest timer`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 2
- [x] Final kick-the-tires exploration and feedback completed — Slice 4 & 5

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete
- [x] Optional edit and transfer reflection addressed
- [x] `devpost/app-map.html` generated

Activity and evidence: Daily Task Routine addition, auto-advance queue, and rest timer.
Route and stops: `src/routine.js` -> `index.html` -> `tests/test.html`
Edit outcome: Verified unit tests and routine workflow.
Reflection: Completed.
Activity mode: Live code walkthrough.

## Revisions
- [Daily Task Routine added] — User requested Daily Task Routine with setup screen, 2-minute rest timer, auto-advance queue for Push-ups, Squats, and Bicep Curls, and localStorage target persistence.
