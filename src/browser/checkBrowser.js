export function getBrowserType() {
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf("Chrome") === -1 && navigator.userAgent.indexOf("Edge") === -1) {
        return "Safari";
    }
    return false;
}

