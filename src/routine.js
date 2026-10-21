/**
 * routine.js - Daily Task Routine queue manager, target persistence, and rest timer
 */

const TARGETS_STORAGE_KEY = 'repcounter_targets';

export function getDailyTargets() {
    try {
        const data = localStorage.getItem(TARGETS_STORAGE_KEY);
        return data ? JSON.parse(data) : { pushups: 10, squats: 10, curls: 10 };
    } catch (e) {
        console.error('Failed to load daily targets', e);
        return { pushups: 10, squats: 10, curls: 10 };
    }
}

export function saveDailyTargets(targets) {
    try {
        localStorage.setItem(TARGETS_STORAGE_KEY, JSON.stringify(targets));
        return true;
    } catch (e) {
        console.error('Failed to save daily targets', e);
        return false;
    }
}

export class RoutineManager {
    constructor(targets) {
        this.queue = [
            { id: 'pushups', name: 'Push-ups', target: targets.pushups || 10 },
            { id: 'squats', name: 'Squats', target: targets.squats || 10 },
            { id: 'curls', name: 'Bicep Curls', target: targets.curls || 10 }
        ];
        this.currentIndex = 0;
        this.results = [];
    }

    getCurrentExercise() {
        if (this.currentIndex < this.queue.length) {
            return this.queue[this.currentIndex];
        }
        return null;
    }

    recordResult(exerciseId, reps, goodReps, badReps, duration) {
        this.results.push({
            exerciseId,
            totalReps: reps,
            goodReps,
            badReps,
            durationSeconds: duration
        });
    }

    advance() {
        this.currentIndex++;
        return this.getCurrentExercise();
    }

    isComplete() {
        return this.currentIndex >= this.queue.length;
    }

    getTotalSummary() {
        const totalReps = this.results.reduce((sum, r) => sum + r.totalReps, 0);
        const totalDuration = this.results.reduce((sum, r) => sum + r.durationSeconds, 0);
        return {
            exercises: this.results,
            totalReps,
            totalDuration
        };
    }
}

export class RestTimer {
    constructor(durationSeconds = 120, onTick, onComplete) {
        this.durationSeconds = durationSeconds;
        this.remaining = durationSeconds;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.timerId = null;
    }

    start() {
        this.remaining = this.durationSeconds;
        if (this.onTick) this.onTick(this.remaining);

        this.timerId = setInterval(() => {
            this.remaining--;
            if (this.onTick) this.onTick(this.remaining);

            if (this.remaining <= 0) {
                this.stop();
                if (this.onComplete) this.onComplete();
            }
        }, 1000);
    }

    skip() {
        this.stop();
        if (this.onComplete) this.onComplete();
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
}
