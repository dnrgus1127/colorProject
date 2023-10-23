import { Color } from "../constructor/Color.js";
import { checkHexa, checkRgb } from "./regex/validColor.js";
import { getRegularColor } from "./regularColor.js";


/**
 * @param {string} text hex, rgb 타입 색상 코드나, 색상 이름 (white,black 등)
 * @returns {Color} Color 인스턴스를 생성하여 반환
 */
export function searchColor(text) {
    if (text.length === 0) {
        return false;
    }
    if (!checkHexa(text) && !checkRgb(text)) {
        return searchRegularColor(text);
    }
    else {
        return new Color(text);
    }
}


function searchRegularColor(text) {
    const regularColor = getRegularColor(text);

    if (!regularColor) return false;

    return regularColor;
}