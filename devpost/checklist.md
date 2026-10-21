---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Dashboard, Exercise Selection & Storage Foundation**
  Becomes usable: The home dashboard opens with exercise selection cards (Push-ups, Squats, Bicep Curls) and loads/saves workout history from/to browser LocalStorage. Clicking an exercise opens the active workout placeholder.
  Why now: Establishes the project scaffold, Tailwind UI, local storage model, and main navigation loop.
  PRD ref: `prd.md > The Core Journey` (steps 1, 2, 6), `prd.md > Screens and Layout` (Dashboard & History).
  Spec ref: `spec.md > Components` (Dashboard, Summary & Storage), `spec.md > File Structure`, `spec.md > Data Model`.
  Build: Create `index.html`, `style.css`, and `src/storage.js`. Build the dashboard UI with Tailwind CSS, exercise cards, history table/list, and local storage persistence functions.
  Verify (mechanical): Start local server, open app, verify dashboard renders, save a dummy workout set to localStorage, and verify it appears in history.
  Learner check: Open the dashboard, view history, and confirm the layout feels like a clean dark mode fitness app.
  Commit: `Add dashboard UI, exercise cards, history, and storage module`

- [x] **2. MediaPipe Pose Integration, Skeleton Overlay & Error Handling**
  Becomes usable: Selecting an exercise starts the webcam, loads MediaPipe Pose via CDN, renders the live video feed with the skeleton canvas overlay, and pauses with a warning popup if illumination is poor or person is missing.
  Why now: Proves the core vision engine and robust error handling early before building counting logic.
  PRD ref: `prd.md > The Core Journey` (steps 2, 4), `prd.md > Features and Behavior` (Live Pose Tracking, Error Handling).
  Spec ref: `spec.md > Components` (Pose & Video Stream Component), `spec.md > External Services`.
  Build: Implement `src/pose.js` integrating MediaPipe Pose and camera utils from CDN, canvas skeleton drawing, video pause logic, and error warning popup overlay in `index.html`.
  Verify (mechanical): Start webcam feed in browser, verify skeleton lines draw over body keypoints, and verify warning overlay triggers if camera is covered.
  Learner check: Open active workout, see yourself with the live skeleton overlay, and test covering the camera to see the warning popup.
  Commit: `Integrate MediaPipe Pose, skeleton canvas overlay, and error warnings`

- [x] **3. Joint Angle Calculations, State Machine Rep Counting & Form Rules**
  Becomes usable: Performing reps (Push-ups, Squats, Bicep Curls) in front of the webcam calculates joint angles, smooths readings, updates the finite state machine, increments the live rep counter, and shows real-time form warnings.
  Why now: Delivers the unique kernel of the app—accurate rep counting and posture checking.
  PRD ref: `prd.md > The Core Journey` (step 3), `prd.md > Features and Behavior` (Live Pose Tracking, Real-Time Form Checking).
  Spec ref: `spec.md > Components` (Rep Counter & State Machine Component, Form Rules Component).
  Build: Implement `src/counter.js` (angle math, moving average smoothing, up/down state machine) and `src/rules.js` (config-driven angle thresholds and form posture checks for Push-ups, Squats, Bicep Curls). Connect to active HUD counter and form indicator.
  Verify (mechanical): Test angle calculations and state machine via unit tests (`tests/test.html`) and live movement in browser.
  Learner check: Perform a few test reps (e.g. squats or bicep curls) in front of the camera and watch the live rep counter and form indicator update.
  Commit: `Implement angle math, state machine rep counter, and form rules`

- [x] **4. Set Summary Modal, Stop Action & End-to-End Polish**
  Becomes usable: Clicking the "Stop" button ends the workout, computes total/good/bad reps and elapsed time, displays the Set Summary modal, and saves the set to history. Plus unit test suite and README documentation.
  Why now: Completes the full core journey loop and ensures documentation and tests are solid.
  PRD ref: `prd.md > The Core Journey` (steps 5, 6), `prd.md > Screens and Layout` (Set Summary Modal).
  Spec ref: `spec.md > Components` (Summary & Storage Component), `spec.md > File Structure`, `README.md`.
  Build: Build the Set Summary modal popup in `index.html`, wire up the Stop button, save set results to localStorage via `storage.js`, create `tests/test.html` for unit tests, and write `README.md` with setup instructions.
  Verify (mechanical): Run a mock workout, click Stop, verify summary modal appears with correct statistics, check that history updates, and run unit tests.
  Learner check: Run a complete workout session, stop, review the set summary modal, return to dashboard, and check your saved history.
  Commit: `Add set summary modal, completion flow, unit tests, and README`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 2 (Live camera feed & skeleton overlay)
- [x] Final kick-the-tires exploration and feedback completed — Slice 4

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Explored angle math and state machine implementation in `src/counter.js` and MediaPipe video loop in `src/pose.js`.
Route and stops: `src/counter.js` -> `src/pose.js` -> `index.html`
Edit outcome: Verified working angle calculation and rep counting tests.
Reflection: Discussed client-side pose estimation and state machines.
Activity mode: Live code walkthrough.

## Revisions
