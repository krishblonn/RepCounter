---
doc: spec
status: approved
---

# RepCounter — Technical Spec

## How This Works, In Plain Language
RepCounter is a browser-based workout companion featuring a **Modern Glassmorphism UI** and **Interactive Animations** powered by pure CSS and Tailwind CSS.
- **The Glassmorphism & Neon Design System:** Utilizes translucent panels (`backdrop-blur`), subtle ambient background glows, and glowing focus borders (`neon-input`) for a premium fitness app feel.
- **Pure CSS Animations:** Smooth screen fade transitions (`view-transition`), exercise card hover scaling (`glass-card`), rep counter pulse animations (`rep-pulse`), and an animated SVG circular progress ring for the rest timer—ensuring butter-smooth 60fps performance even on modest 4GB RAM laptops without heavy JavaScript animation libraries.
- **The Routine Queue & Rest Timer:** Manages the sequential flow between Daily Task setup, exercises, and the 2-minute countdown rest timer.
- **The Pose & Angle Engine:** MediaPipe Pose extracts keypoints locally via CDN, while `counter.js` and `rules.js` track Push-ups, Squats, and calibrated Bicep Curls.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
1. **Dashboard & Setup:** User opens glassmorphic dashboard, clicks 'Daily Task Routine', configures target reps in glowing inputs, and saves them.
2. **Routine Execution:** Clicking 'Start Daily Routine' triggers fade transition to Exercise 1 with webcam pose estimation and massive pulsing rep counter.
3. **Auto-Advance & Rest:** Upon reaching target reps, app triggers 2-Minute Rest Timer with animated circular SVG progress ring, then auto-advances.
4. **Completion:** Final summary saves total routine stats to LocalStorage.

## Stack
- Frontend: HTML5, Tailwind CSS (via CDN), Custom CSS (`style.css`)
- Computer Vision: MediaPipe Pose (@mediapipe/pose, camera_utils, drawing_utils)
- Scripting: Vanilla JavaScript (ES6 Modules)
- Persistence: Browser LocalStorage API

## Where It Runs and How Someone Tries It
- Run local server: `python3 -m http.server 8000`
- Open `http://localhost:8000`

## Look and Feel
- **Theme:** Deep dark slate/black (`#030712`) with ambient cyan and purple background gradients.
- **UI Elements:** Glassmorphism (`backdrop-blur-xl`, semi-transparent backgrounds with subtle borders).
- **Animations:** Pure CSS transitions, card hover transforms, rep pulsing, and SVG circular progress ring.

## Components
### UI & Glassmorphism Theme (`index.html` + `style.css`)
- Glassmorphic panels, glowing inputs, screen fade transitions, and massive pulsing rep counter HUD.

### Daily Task Setup & Routine Manager (`index.html` + `src/routine.js`)
- Manages routine target inputs, persistence, queue progression, and circular progress ring rest timer.

### Pose & Counting Engine (`src/pose.js`, `src/counter.js`, `src/rules.js`)
- Handles MediaPipe camera stream, keypoint angle math, state machine rep counting, and calibrated Bicep Curl tracking.

## File Structure
```
RepCounter/
├── index.html
├── style.css               # Contains glassmorphism, glowing effects, circular progress ring, and fade animations
├── src/
│   ├── pose.js
│   ├── counter.js
│   ├── rules.js
│   ├── storage.js
│   └── routine.js
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
- Pure CSS animations instead of GSAP or heavy JS libraries to guarantee smooth performance on 4GB RAM hardware.
