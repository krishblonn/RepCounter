---
doc: prd
status: approved
---

# RepCounter — Product Requirements

A browser-based exercise rep counter and form checker using webcam pose estimation, built for fitness enthusiasts and home workout practitioners.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.
1. **Arrival & Dashboard:** The user opens the web app in their browser and lands on a clean home screen showing a selection menu of available exercises (Push-ups, Squats, Bicep Curls) and past workout history.
2. **Exercise Selection & Startup:** The user clicks an exercise (e.g., Push-ups). The app transitions to the active workout screen and requests webcam access.
3. **Active Workout & Tracking:** The webcam feed loads with a live MediaPipe skeleton overlay. As the user performs reps, the state machine tracks joint angles, increments the live rep counter, and displays real-time form status (green/yellow/red).
4. **Error Handling:** If lighting is poor or no person is detected, the camera feed pauses and a clear descriptive popup alerts the user. Once adjusted, the popup disappears automatically and tracking resumes.
5. **Set Completion:** The user clicks the large "Stop" button. The workout ends, and a summary popup displays total reps, good-form reps, bad-form reps, and time taken.
6. **Persistence & Review:** The set data is automatically saved to browser local storage, updating the history list on the dashboard.

## Screens and Layout
1. **Home / Dashboard Screen:** Clean dark mode header, exercise selection cards/buttons, and a past workout history list.
2. **Active Workout Screen:** Full-screen video feed with canvas overlay for the skeleton tracker, top HUD displaying current exercise, large rep counter, form status indicator (green/yellow/red), and a prominent "Stop" button.
3. **Set Summary Modal:** Popup overlay showing set statistics (total reps, good vs. bad form breakdown, duration) with a "Back to Dashboard" button.
4. **Error / Warning Overlay:** Modal/banner overlay appearing over the video feed when tracking conditions fail (e.g., "Person not detected" or "Poor lighting").

## Look and Feel
- **Style:** Dark mode fitness dashboard aesthetic.
- **Colors & Indicators:** High-contrast light green active indicators, green/yellow/red color coding for form feedback and status.
- **Typography & HUD:** Clean, large, legible numbers and text designed to be easily read from a distance while exercising.

## Features and Behavior

### Exercise Selection & Dashboard
- Displays card options for Push-ups, Squats, and Bicep curls.
- Lists past saved workout sets retrieved from browser local storage.
  - [ ] Clicking an exercise card starts the webcam and opens the active workout screen.
  - [ ] History list persists across browser refreshes and displays date, exercise name, total reps, and form accuracy percentage.

### Live Pose Tracking & Rep Counting
- Integrates browser-based MediaPipe Pose to extract body keypoints.
- Calculates joint angles (elbow for push-ups/curls, knee/hip for squats).
- Implements a finite state machine ("up" / "down") with temporal smoothing (moving average over recent frames) to prevent jitter and double counting.
  - [ ] Skeleton overlay accurately draws joints and connecting lines on the live video feed.
  - [ ] Rep counter increments precisely when a full cycle (down threshold followed by up return) is completed.

### Real-Time Form Checking & Error Handling
- Evaluates posture rules per exercise (e.g., back straight, knees inward, arm swing).
- Shows live form feedback indicator (green for good, yellow/red for warnings).
- Pauses tracking and displays a descriptive popup if person is lost or lighting is inadequate.
  - [ ] Warning popup appears immediately upon tracking failure and dismisses automatically when conditions normalize.
  - [ ] Form score percentage is tracked per set.

### Set Summary & Storage
- Captures set statistics upon clicking "Stop".
  - [ ] Summary modal displays total reps, good-form rep count, bad-form rep count, and elapsed time.
  - [ ] Data is saved to browser local storage.

## States and Boundaries
- **First Use:** Dashboard shows no past workout history; exercise selection is fully available.
- **Normal Use:** Active workout tracks reps and displays live skeleton overlay.
- **Error State (Poor Lighting / No Person):** Camera tracking pauses, video feed shows warning popup with specific issue; resumes automatically when resolved.
- **Set Completion State:** Summary modal interrupts workout view until user returns to dashboard.
- **Persistence:** Set history persists in browser local storage across page refreshes.

## Product Decisions
- **Browser Local Storage:** Chosen for data persistence so no backend server or user authentication is required, keeping the proof of concept simple and self-contained.
- **Client-Side MediaPipe:** Chosen for zero paid API keys, zero latency, and complete privacy (video never leaves the device).
- **Dark Mode Fitness HUD:** High-contrast light green indicators chosen for visibility during active movement.

## What We're Building
- Browser-based UI with Dashboard, Active Workout view, Summary modal, and Warning overlay.
- MediaPipe Pose integration with skeleton canvas rendering.
- Config-driven rep counting for Push-ups, Squats, and Bicep curls using finite state machines and angle smoothing.
- Real-time form rule checks and posture warnings.
- Local storage persistence for set history.
- Unit tests for angle calculation and state machine logic.

## Deferred From the POC
- Cloud user authentication and database sync across devices.
- Audio cue sounds for form warnings.
- Custom exercise configuration creator UI.

## Possible Later Enhancements
- Multi-person tracking and auto-person selection.
- Advanced analytics charts for historical progress tracking.

## Non-Goals
- Professional physical therapy diagnosis or medical-grade posture analysis.
- Mobile native app distribution (browser-only MVP).

## Open Questions
- None. All requirements and behaviors are fully defined.
