export function valueToPercent(value, min, max) {
    return ((value - min) * 100) / (max - min);
}

export function percentToValue(percent, min, max) {
    return (max - min) * percent + min;
}

function makeValuePrecise(value, step) {
    const stepDecimalPart = step.toString().split('.')[1];
    const stepPrecision = stepDecimalPart ? stepDecimalPart.length : 0;
    return Number(value.toFixed(stepPrecision));
}

export function roundValueToStep(value, step) {
    return makeValuePrecise(Math.round(value / step) * step, step);
}

export function clampValue(val, min, max) {
    if (val > max) {
        return max;
    }
    if (val < min) {
        return min;
    }
    return val;
}
