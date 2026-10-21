---
doc: spec
status: approved
---

# RepCounter — Technical Spec

## How This Works, In Plain Language
RepCounter is a browser-based workout companion that now includes a **Daily Task Routine** workflow.
- **The Routine Queue Manager:** Manages the sequential flow from Setup -> Exercise 1 (Push-ups) -> 2-Min Rest Timer -> Exercise 2 (Squats) -> 2-Min Rest Timer -> Exercise 3 (Bicep Curls) -> Routine Summary.
- **The Rest Timer:** A countdown interval timer (02:00) that pauses exercise tracking, displays remaining time, and supports manual skipping.
- **The Pose & Angle Engine:** MediaPipe Pose extracts keypoints locally via CDN, while `counter.js` and `rules.js` track Push-ups, Squats, and calibrated Bicep Curls.
- **Persistence:** Both workout history and Daily Task targets are saved in browser LocalStorage.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
1. **Dashboard & Setup:** User opens dashboard, clicks 'Daily Task Routine', configures target reps for the 3 exercises, and saves them.
2. **Routine Execution:** Clicking 'Start Daily Routine' launches Exercise 1 with webcam pose estimation.
3. **Auto-Advance & Rest:** Upon reaching target reps, the app triggers the 2-Minute Rest Timer, then auto-advances to the next exercise.
4. **Completion:** Final summary saves total routine stats to LocalStorage.

## Stack
- Frontend: HTML5, Tailwind CSS (via CDN)
- Computer Vision: MediaPipe Pose (@mediapipe/pose, camera_utils, drawing_utils)
- Scripting: Vanilla JavaScript (ES6 Modules)
- Persistence: Browser LocalStorage API

## Where It Runs and How Someone Tries It
- Run local server: `python3 -m http.server 8000`
- Open `http://localhost:8000`

## Look and Feel
- Dark mode fitness dashboard aesthetic (`bg-slate-900`, `text-slate-100`, emerald green accents).
- Large 02:00 countdown timer display during rest periods.

## Components
### Daily Task Setup & Routine Manager (`index.html` + `src/routine.js`)
- Manages routine target inputs, persistence, queue progression, and rest timer countdown.

### Pose & Counting Engine (`src/pose.js`, `src/counter.js`, `src/rules.js`)
- Handles MediaPipe camera stream, keypoint angle math, state machine rep counting, and calibrated Bicep Curl tracking.

## File Structure
```
RepCounter/
├── index.html
├── style.css
├── src/
│   ├── pose.js
│   ├── counter.js
│   ├── rules.js
│   ├── storage.js
│   └── routine.js          # New: Daily task routine queue and rest timer logic
├── tests/
│   └── test.html
├── README.md
└── devpost/
    ├── scope.md
    ├── prd.md
    ├── spec.md
    └── checklist.md
```

## Important Failure Modes
- **Webcam permission denied** → Error alert.
- **Target reps 0** → Prompts user to set targets before starting routine.

## What Was Simplified and Why
- Local storage for targets and history avoids backend databases.
