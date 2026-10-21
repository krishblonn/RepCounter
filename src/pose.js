/**
 * pose.js - MediaPipe Pose wrapper and video stream handler
 */

export class PoseTracker {
    constructor(videoElement, canvasElement, onResultsCallback, onErrorStateChange) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.onResultsCallback = onResultsCallback;
        this.onErrorStateChange = onErrorStateChange;
        this.pose = null;
        this.camera = null;
        this.isRunning = false;
    }

    async init() {
        const videoElement = this.videoElement;
        const canvasElement = this.canvasElement;
        const ctx = this.ctx;

        this.pose = new window.Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.pose.onResults((results) => {
            // Check canvas sizing
            if (canvasElement.width !== videoElement.videoWidth || canvasElement.height !== videoElement.videoHeight) {
                canvasElement.width = videoElement.videoWidth || 640;
                canvasElement.height = videoElement.videoHeight || 480;
            }

            ctx.save();
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            // Draw video frame onto canvas
            ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            if (results.poseLandmarks) {
                // Check visibility / confidence of core joints (e.g. left/right shoulder and hip)
                const landmarks = results.poseLandmarks;
                const leftShoulder = landmarks[11];
                const rightShoulder = landmarks[12];
                const isVisible = leftShoulder && rightShoulder && (leftShoulder.visibility > 0.5 && rightShoulder.visibility > 0.5);

                if (!isVisible) {
                    if (this.onErrorStateChange) this.onErrorStateChange(true, "Person not fully detected or low lighting");
                } else {
                    if (this.onErrorStateChange) this.onErrorStateChange(false, "");
                }

                // Draw skeleton connectors and landmarks
                window.drawConnectors(ctx, landmarks, window.POSE_CONNECTIONS, { color: '#10B981', lineWidth: 4 });
                window.drawLandmarks(ctx, landmarks, { color: '#34D399', lineWidth: 2, radius: 4 });

                // Pass landmarks to exercise counter/rules callback
                if (this.onResultsCallback) {
                    this.onResultsCallback(landmarks);
                }
            } else {
                if (this.onErrorStateChange) this.onErrorStateChange(true, "No person detected in frame");
            }

            ctx.restore();
        });

        this.camera = new window.Camera(videoElement, {
            onFrame: async () => {
                if (this.isRunning) {
                    await this.pose.send({ image: videoElement });
                }
            },
            width: 640,
            height: 480
        });

        await this.camera.start();
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
        if (this.camera) {
            this.camera.stop();
        }
        if (this.pose) {
            this.pose.close();
        }
    }
}
