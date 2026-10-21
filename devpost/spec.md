---
doc: spec
status: approved
---

# RepCounter — Technical Spec

## How This Works, In Plain Language
RepCounter is a browser-based workout companion that uses your laptop webcam and computer vision to track your body movements in real time. 
- **The Vision / Pose Engine:** MediaPipe Pose runs directly inside your browser via CDN, streaming video frames and outputting body keypoints (shoulders, elbows, wrists, hips, knees, ankles) locally on your device without uploading any video to a server.
- **The Angle & Rep Calculator:** As keypoints stream in, math functions calculate specific joint angles (like elbow or knee bend). A finite state machine ("up" and "down") combined with a temporal moving average smooths out jitter and counts completed reps accurately.
- **The Form Checker:** Each exercise has configuration rules (e.g., push-up back straightness, squat knee alignment). If rules are broken, live visual indicators turn yellow or red. If lighting fails or you step out of frame, the camera pauses and shows an explicit warning popup.
- **The UI & History:** Built with vanilla HTML, Tailwind CSS (via CDN), and modular JavaScript. Sets and past workouts are saved in browser Local Storage so your history persists across refreshes.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
1. **Arrival & Dashboard:** The user opens `index.html`. `storage.js` loads past workout sets from localStorage and renders the dashboard and history list.
2. **Exercise Selection:** Clicking an exercise card triggers `pose.js` to initialize webcam access and start the MediaPipe Pose model.
3. **Active Workout & Tracking:** `pose.js` processes each video frame, extracts keypoints, and renders the skeleton canvas. `counter.js` calculates joint angles, smooths readings, and updates the state machine. `rules.js` evaluates form. The UI updates the live rep counter and form status in real time.
4. **Error Handling:** If MediaPipe confidence drops below threshold or keypoints are missing, `pose.js` pauses processing and triggers the error warning overlay. When conditions normalize, it dismisses automatically.
5. **Set Completion:** Clicking the "Stop" button halts the workout, aggregates set statistics, opens the Set Summary modal, and saves the set via `storage.js` to localStorage.

## Stack
- **Frontend UI:** HTML5, Tailwind CSS (via CDN) — [Tailwind Docs](https://tailwindcss.com/docs)
- **Computer Vision:** MediaPipe Pose (@mediapipe/pose, @mediapipe/camera_utils, @mediapipe/drawing_utils via CDN) — [MediaPipe Pose Docs](https://developers.google.com/mediapipe/solutions/vision/pose)
- **Scripting & Logic:** Vanilla JavaScript (ES6 Modules)
- **Persistence:** Browser LocalStorage API
- **Testing:** Vanilla JS unit test script running in browser or Node.js for angle calculation and state machine logic.
- **Rationale:** Zero build complexity, runs instantly in any browser, 100% client-side privacy.

## Where It Runs and How Someone Tries It
- **Runtime:** Any modern desktop or mobile browser with webcam support (Chrome, Firefox, Edge, Safari).
- **Environment:** No server or API keys required.
- **How to Run:** 
  1. Open terminal in the project directory.
  2. Run a local static server (e.g., `python3 -m http.server 8000`).
  3. Open `http://localhost:8000` in your browser.
- **Submission:** A GitHub repository containing all source code and documentation, paired with a short recorded demo video showing live push-ups, squats, and curls working end-to-end.

## Look and Feel
- **Style:** Dark mode fitness dashboard aesthetic (`bg-slate-900`, `text-slate-100`).
- **Colors:** High-contrast light green active indicators (`text-emerald-400`, `bg-emerald-500`), red/yellow alerts for form posture warnings.
- **HUD:** Large, legible typography for rep counters and status, designed for visibility at a distance while moving.

## Components

### Dashboard Component (`index.html` + `storage.js`)
- Renders exercise selection cards and past workout history table/list.
- PRD ref: `prd.md > Exercise Selection & Dashboard`.

### Pose & Video Stream Component (`src/pose.js`)
- Initializes webcam stream and loads MediaPipe Pose model.
- Renders video feed and canvas skeleton overlay.
- Detects low confidence / lost person and triggers error warning overlay.
- PRD ref: `prd.md > Live Pose Tracking & Rep Counting`, `prd.md > Real-Time Form Checking & Error Handling`.

### Rep Counter & State Machine Component (`src/counter.js`)
- Calculates joint angles (3-point angle math).
- Implements temporal smoothing (moving average over last 5 frames).
- Manages finite state machine ("up" / "down") to count reps reliably without double-counting.
- PRD ref: `prd.md > Live Pose Tracking & Rep Counting`.

### Form Rules Component (`src/rules.js`)
- Config-driven definitions for Push-ups, Squats, and Bicep curls (threshold angles and posture checks).
- Evaluates form rules per frame and returns status (good/warning).
- PRD ref: `prd.md > Real-Time Form Checking & Error Handling`.

### Summary & Storage Component (`index.html` + `storage.js`)
- Captures set results, displays Summary modal, and persists set history to localStorage.
- PRD ref: `prd.md > Set Summary & Storage`.

## Data Model
- **Workout Set Object (JSON):**
  ```json
  {
    "id": "uuid_or_timestamp",
    "exercise": "Push-ups",
    "date": "2026-10-21T22:00:00.000Z",
    "totalReps": 12,
    "goodReps": 10,
    "badReps": 2,
    "formAccuracy": 83,
    "durationSeconds": 45
  }
  ```
- **Storage Location:** Browser `localStorage` under key `repcounter_history`. Persists across page refreshes.

## File Structure
```
RepCounter/
├── index.html              # Main single-page application (Dashboard, Workout, Summary, Warnings)
├── style.css               # Custom styles / Tailwind enhancements
├── src/
│   ├── pose.js             # MediaPipe camera & keypoint handler
│   ├── counter.js          # Angle math, smoothing, and state machine
│   ├── rules.js            # Exercise configs (push-ups, squats, curls) and posture checks
│   └── storage.js          # LocalStorage history management
├── tests/
│   └── test.html           # Unit test suite runner for angle calculations and state machine
├── README.md               # Setup instructions and explanation of rep counting logic
└── devpost/
    ├── learner-profile.md
    ├── scope.md
    ├── prd.md
    └── spec.md
```

## External Services and Dependencies
- **MediaPipe Pose CDN Scripts:**
  - `https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js`
  - `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js`
  - `https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js`
- **Tailwind CSS CDN:**
  - `https://tailwindcss.com`

## Important Failure Modes
- **Webcam Permission Denied / Unavailable** → User sees an onboarding alert explaining how to allow camera access in browser settings.
- **Poor Lighting / Person Out of Frame** → MediaPipe confidence drops; active tracking pauses, displaying the explicit warning popup ("Poor lighting or person not detected"). Resumes automatically when user adjusts.
- **Stray Jitter / False Reps** → Mitigated by temporal smoothing (moving average of last 5 frames) and hysteresis thresholds in the state machine.

## What Was Simplified and Why
- **Local Storage instead of Cloud DB** → Ensures zero backend setup, 100% local privacy, and instant execution.
- **Vanilla JS modules instead of React/Vite build chain** → Eliminates build tool friction, letting us focus entirely on pose detection and rep counting logic.

## Decisions and Open Issues
- **Uncertainty / Learning Point Discussed:** How pose estimation keypoints translate into angles and state machine counts. Clarified through modular code separating keypoints (`pose.js`), angle math/state machine (`counter.js`), and exercise rules (`rules.js`).
- **Decision:** Client-side MediaPipe + HTML5 Canvas overlay selected for zero latency and privacy.
