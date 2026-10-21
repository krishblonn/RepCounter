# RepCounter & Daily Task Routine

A browser-based exercise rep counter, form checker, and structured **Daily Task Routine** system using webcam pose estimation and MediaPipe. Built as a proof of concept with zero backend servers and 100% client-side privacy.

## Features
- **Daily Task Routine:** Configure custom target reps for Push-ups, Squats, and Bicep Curls with automatic persistence in browser LocalStorage.
- **Auto-Advance & 2-Minute Rest Timers:** Automatically transitions from exercise to rest period upon hitting target reps, complete with a countdown timer and a 'Skip Rest' button.
- **Real-Time Pose Tracking:** Uses MediaPipe Pose running locally in the browser to detect body keypoints via webcam with zero video upload.
- **Calibrated Exercise Support:** Supports Push-ups, Squats, and fully calibrated Bicep Curls with custom angle thresholds and posture checks.
- **Finite State Machine Rep Counting:** Accurate counting using "up" and "down" states with temporal smoothing (moving average) to eliminate jitter and double-counting.
- **Workout & Routine History:** Automatically saves set and routine summaries to browser LocalStorage.

## Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari) with webcam support.
- A local static web server (e.g., Python 3).

## Compiling and Running
To run the app locally:

1. Start a local static server in the project directory:
   ```bash
   python3 -m http.server 8000
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Running Unit Tests
To run the test suite for angle calculations, state machine rep counting, and routine queue progression:
- Open `http://localhost:8000/tests/test.html` in your browser.

## How Rep Counting Works
1. **Keypoint Extraction:** MediaPipe Pose streams 33 3D body keypoints per video frame.
2. **Angle Calculation:** For each exercise, three keypoints form a joint angle (e.g., shoulder-elbow-wrist for push-ups and bicep curls, or hip-knee-ankle for squats).
3. **Temporal Smoothing:** Angle readings are passed through a moving average filter over the last 5 frames to remove camera jitter.
4. **State Machine:** A finite state machine tracks whether the user is in the "up" or "down" position. A repetition is incremented only when the angle crosses the down threshold and successfully returns past the up threshold.
