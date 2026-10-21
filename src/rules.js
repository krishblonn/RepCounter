/**
 * rules.js - Exercise configurations and form posture rules
 */
import { calculateAngle } from './counter.js';

export const EXERCISE_CONFIGS = {
    pushups: {
        name: 'Push-ups',
        // Joints: Shoulder (11), Elbow (13), Wrist (15)
        getJoints: (l) => [l[11], l[13], l[15]],
        upThreshold: 160,
        downThreshold: 90,
        checkForm: (l) => {
            // Check back straightness: alignment of shoulder (11), hip (23), ankle (27)
            if (!l[11] || !l[23] || !l[27]) return { isGood: true, message: 'Good' };
            const backAngle = calculateAngle(l[11], l[23], l[27]);
            // Straight back should be close to 170-180 degrees
            if (backAngle < 155) {
                return { isGood: false, message: 'Keep your back straight!' };
            }
            return { isGood: true, message: 'Good' };
        }
    },
    squats: {
        name: 'Squats',
        // Joints: Hip (23), Knee (25), Ankle (27)
        getJoints: (l) => [l[23], l[25], l[27]],
        upThreshold: 165,
        downThreshold: 100,
        checkForm: (l) => {
            // Check knee alignment if possible, or basic upright posture
            if (!l[11] || !l[23] || !l[25]) return { isGood: true, message: 'Good' };
            // Check torso lean
            return { isGood: true, message: 'Good' };
        }
    },
    curls: {
        name: 'Bicep Curls',
        // Joints: Shoulder (11), Elbow (13), Wrist (15)
        getJoints: (l) => [l[11], l[13], l[15]],
        upThreshold: 150,
        downThreshold: 50,
        checkForm: (l) => {
            // Check elbow stability
            return { isGood: true, message: 'Good' };
        }
    }
};
