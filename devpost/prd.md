---
doc: prd
status: approved
---

# RepCounter — Product Requirements

A browser-based exercise rep counter, form checker, and **Daily Task Routine** system using webcam pose estimation.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.
1. **Arrival & Dashboard:** The user opens the web app and sees options for individual exercise mode or the new **'Daily Task Routine'**.
2. **Daily Task Setup:** Clicking 'Daily Task Routine' opens a setup screen where target rep counts for Push-ups, Squats, and Bicep Curls can be inputted and saved to browser local storage.
3. **Routine Sequence & Auto-Advance:** Starting the routine launches the first exercise in the queue with the webcam and MediaPipe pose estimation. Once target reps are reached, the app automatically pauses, triggers a **2-Minute Rest Timer** (with a 'Skip Rest' button), and automatically advances to the next exercise upon completion.
4. **Routine Completion:** After all queued exercises finish, a final routine summary screen appears showing total reps and duration, saving the session into history.

## Screens and Layout
1. **Home / Dashboard Screen:** Clean dark mode header, individual exercise cards, past workout history, and a prominent **'Daily Task Routine'** launcher button.
2. **Daily Task Setup Modal / Screen:** Interface to input target rep counts for Push-ups, Squats, and Bicep Curls, saving preferences locally.
3. **Active Workout / Routine Screen:** Full-screen video feed with skeleton overlay, HUD displaying current exercise in queue, target reps vs. current reps, live form status, and a 'Stop Routine' button.
4. **Rest Timer Screen:** Full-screen or modal overlay showing a prominent 2-minute countdown timer (02:00) with a 'Skip Rest' button.
5. **Routine Summary Modal:** Popup showing total completed routine stats and score.

## Look and Feel
- **Style:** Dark mode fitness dashboard aesthetic.
- **Colors & Indicators:** High-contrast light green active indicators, green/yellow/red color coding for form feedback and status.
- **Timers & HUD:** Large, legible countdown timer and progress indicators.

## Features and Behavior

### Daily Task Routine & Persistence
- Allows users to configure target reps for Push-ups, Squats, and Bicep Curls.
- Automatically loads previously saved targets from `localStorage`.
  - [ ] Setup screen correctly saves and loads targets across page refreshes.

### Routine Queue & Auto-Advance Logic
- Automatically sequences Push-ups -> Squats -> Bicep Curls based on target completion.
  - [ ] When target reps for exercise 1 are reached, tracking pauses and the rest timer starts automatically.

### 2-Minute Rest Timer
- Large 02:00 countdown timer between exercises.
- 'Skip Rest' button to instantly proceed to the next exercise.
  - [ ] Timer counts down every second and auto-advances when hitting 00:00 or when clicked.

### Pose Tracking & Bicep Curl Accuracy
- Accurate joint angle calculations for Push-ups, Squats, and Bicep Curls (including fully calibrated Bicep Curl angle tracking with elbow flexion).
  - [ ] Rep counter increments precisely on full cycles.

## States and Boundaries
- **First Use:** Default targets loaded; user can configure their custom daily routine.
- **Active Exercise State:** Live webcam tracking and rep counting.
- **Rest State:** Camera paused, countdown timer active.
- **Completion State:** Routine summary saved to local storage.

## Product Decisions
- **Browser Local Storage:** Used for routine targets and history persistence.
- **Client-Side MediaPipe:** Zero server upload, complete privacy.

## What We're Building
- Dashboard with Daily Task Routine launcher and Setup modal.
- Routine queue runner with auto-advance logic.
- 2-Minute Rest Timer with Skip button.
- Calibrated Push-ups, Squats, and Bicep Curls tracking.
- Routine summary and local history persistence.
- Unit tests for auto-advance routine logic and localStorage targets.

## Deferred From the POC
- Cloud user authentication.
- Audio beeps for rest timer.

## Possible Later Enhancements
- Custom exercise addition.

## Non-Goals
- Medical-grade diagnosis.
- Mobile native apps.

## Open Questions
- None.
