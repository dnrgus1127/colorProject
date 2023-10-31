export function throttle(callback, delay) {
    let timerId;

    return (...args) => {
        if (timerId) return;
        timerId = setTimeout(() => {
            callback(...args);
            timerId = null;
        }, delay)
    }
}