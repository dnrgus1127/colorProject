const checkRgb = (value) => {
    const rgbRegex = /^rgb\((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\)$/i;
    return rgbRegex.test(value);
}

const checkHexa = (value) => {
    const hexaRgex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
    return hexaRgex.test(value);
}

const checkColorCode = (value) => {
    return checkRgb(value) || checkHexa(value);
}

export { checkRgb, checkHexa, checkColorCode }