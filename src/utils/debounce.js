export function debounce(callback, delay) {
    let timerId;

    return (...args) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(callback, delay, ...args);
    }
}