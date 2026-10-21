/**
 * counter.js - Joint angle calculations, temporal smoothing, and finite state machine rep counter
 */

export function calculateAngle(a, b, c) {
    // a, b, c are landmarks with {x, y, z}
    // b is the vertex joint (e.g. elbow, knee)
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
        angle = 360.0 - angle;
    }
    return angle;
}

export class MovingAverage {
    constructor(windowSize = 5) {
        this.windowSize = windowSize;
        this.values = [];
    }

    add(val) {
        this.values.push(val);
        if (this.values.length > this.windowSize) {
            this.values.shift();
        }
        const sum = this.values.reduce((a, b) => a + b, 0);
        return sum / this.values.length;
    }
}

export class RepCounterMachine {
    constructor(config) {
        this.config = config; // { upThreshold, downThreshold }
        this.state = 'up'; // 'up' or 'down'
        this.reps = 0;
        this.angleSmoother = new MovingAverage(5);
    }

    update(rawAngle) {
        const angle = this.angleSmoother.add(rawAngle);

        if (this.state === 'up') {
            if (angle <= this.config.downThreshold) {
                this.state = 'down';
            }
        } else if (this.state === 'down') {
            if (angle >= this.config.upThreshold) {
                this.state = 'up';
                this.reps++;
                return { repCompleted: true, reps: this.reps, angle };
            }
        }

        return { repCompleted: false, reps: this.reps, angle };
    }

    reset() {
        this.state = 'up';
        this.reps = 0;
        this.angleSmoother = new MovingAverage(5);
    }
}
