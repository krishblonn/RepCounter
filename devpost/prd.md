---
doc: prd
status: approved
---

# RepCounter — Product Requirements

A browser-based exercise rep counter, form checker, and **Daily Task Routine** system using webcam pose estimation, featuring a **Modern Glassmorphism UI** and **Interactive Animations**.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.
1. **Arrival & Dashboard:** The user opens the web app and is greeted by a futuristic glassmorphic dashboard with ambient neon glows, exercise cards with smooth hover scale effects, and a prominent **'Daily Task Routine'** launcher.
2. **Daily Task Setup:** Clicking 'Daily Task Routine' opens a modern setup modal with glowing input fields where target rep counts for Push-ups, Squats, and Bicep Curls can be configured and saved to browser local storage.
3. **Routine Sequence & Auto-Advance:** Starting the routine launches the first exercise in the queue with the webcam and MediaPipe pose estimation. Once target reps are reached, the app automatically pauses, triggers a **2-Minute Rest Timer** featuring an animated circular SVG progress ring (with a 'Skip Rest' button), and automatically advances to the next exercise.
4. **Routine Completion:** After all queued exercises finish, a final routine summary screen appears showing total reps and duration, saving the session into history.

## Screens and Layout
1. **Home / Dashboard Screen:** Glassmorphic header, ambient background glows, interactive exercise cards with emoji icons and smooth hover animations, workout history panel, and the Daily Task Routine action button.
2. **Daily Task Setup Modal:** Glassmorphic modal overlay with glowing input fields (`neon-input`) and animated gradient buttons.
3. **Active Workout / Routine Screen:** Full-screen video feed with skeleton overlay, massive rep counter with rep-pulse animation on every count, glowing form status badge (green for good, red pulsing for bad form), and End Session control.
4. **Rest Timer Screen:** Glassmorphic modal featuring an animated circular SVG progress ring countdown (02:00) and 'Skip Rest' button.
5. **Routine Summary Modal:** Glassmorphic modal displaying total completed routine stats and score.

## Look and Feel
- **Style:** Modern Glassmorphism & Neon aesthetic (`glass-panel`, `glass-card`, backdrop-blur, subtle ambient cyan/purple background glows).
- **Colors & Indicators:** High-contrast emerald green active indicators, glowing red/green form status badges.
- **Animations:** Pure CSS smooth screen fade transitions (`view-transition`), rep counter pulse animation (`rep-pulse`), and hover card elevations.

## Features and Behavior

### Modern Glassmorphism UI & Interactive Animations
- Sleek dark theme with ambient cyan and purple background gradients.
- Translucent frosted glass panels with backdrop blur.
  - [ ] Exercise cards scale up and glow smoothly on hover.
  - [ ] Rep counter pulses gently on each increment.

### Circular Rest Timer Progress Ring
- Animated SVG circular progress ring tracking the 2-minute countdown.
  - [ ] Ring stroke smoothly decreases as time elapses.

## States and Boundaries
- **First Use:** Default targets loaded; user can configure their custom daily routine.
- **Active Exercise State:** Live webcam tracking and rep counting with pulse animation.
- **Rest State:** Camera paused, circular progress countdown active.
- **Completion State:** Routine summary saved to local storage.

## Product Decisions
- **Pure CSS Animations:** Selected over heavy JS animation libraries (like GSAP) to ensure smooth 60fps performance on modest hardware (e.g., 4GB RAM laptops).
- **Browser Local Storage:** Used for routine targets and history persistence.
- **Client-Side MediaPipe:** Zero server upload, complete privacy.

## What We're Building
- Glassmorphic dashboard with interactive hover animations.
- Daily Task Setup modal with glowing inputs.
- Routine queue runner with auto-advance logic.
- 2-Minute Rest Timer with animated circular progress ring.
- Calibrated Push-ups, Squats, and Bicep Curls tracking with massive pulsing rep counter and form status badge.
- Routine summary and local history persistence.

## Deferred From the POC
- Cloud user authentication.
- Audio beeps for rest timer.

## Non-Goals
- Medical-grade diagnosis.
- Mobile native apps.

## Open Questions
- None.
