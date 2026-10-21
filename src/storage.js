/**
 * storage.js - LocalStorage management for workout history
 */

const STORAGE_KEY = 'repcounter_history';

export function getWorkoutHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const history = data ? JSON.parse(data) : [];
        // Filter out any zero-rep or canceled entries
        return history.filter(item => item && item.totalReps > 0);
    } catch (e) {
        console.error('Failed to load workout history from localStorage', e);
        return [];
    }
}

export function saveWorkoutSet(workoutSet) {
    if (!workoutSet || workoutSet.totalReps <= 0) {
        // Do not save zero rep workouts or cancellations
        return null;
    }
    try {
        const history = getWorkoutHistory();
        const newSet = {
            id: 'set_' + Date.now(),
            date: new Date().toISOString(),
            ...workoutSet
        };
        history.unshift(newSet); // newest first
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return newSet;
    } catch (e) {
        console.error('Failed to save workout set to localStorage', e);
        return null;
    }
}

export function clearWorkoutHistory() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear workout history', e);
    }
}
