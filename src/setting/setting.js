import { DEFAULT_BASECOLOR, DEFAULT_COLOR } from "../constants.js";
import { checkColorCode, checkHexa, checkRgb } from "../regex/validColor.js";
import { Color, hexToRgbCode, rgbToHex } from "../utils/color.js";

export class Setting {
    constructor(colorType, mainColor = DEFAULT_COLOR, baseColor = DEFAULT_BASECOLOR) {
        this.colorType = colorType;
        this._baseColor = new Color(baseColor);
        this._mainColor = new Color(mainColor);
    }

    onToggleColorType() {
        this.colorType = this.colorType === "HEX" ? "RGB" : "HEX";

    }

    get baseColor() {
        return this._baseColor;
    }
    set baseColor(color) {

        // 컬러 타입 검증 
        if (!checkColorCode(color)) {
            alert("올바른 색상 값이 아닙니다. : base")
            this._baseColor = DEFAULT_BASECOLOR;
            return;
        }
        this._baseColor = new Color(color);
    }

    get mainColor() {
        return this._mainColor;
    }

    set mainColor(color) {
        if (!checkColorCode(color)) {
            alert("올바른 색상 값이 아닙니다.")
            this._mainColor = DEFAULT_COLOR;
            return;
        }
        this._mainColor = new Color(color);
    }
}


export function convertColorByType(colorCode, type) {
    if (checkHexa(colorCode)) {
        return type === "HEX" ? colorCode : hexToRgbCode(colorCode);
    }
    else if (checkRgb(colorCode)) {
        return type === "RGB" ? colorCode : rgbToHex(colorCode);
    }
    else {
        return DEFAULT_COLOR;
    }
}