import { COLOR_TYPE_HEX, COLOR_TYPE_RGB } from "../constants.js";
import { checkHexa, checkRgb } from "../utils/regex/validColor.js";
import { decimalToHex } from "../utils/formatting.js";

export class Color {
    constructor(color) {
        if (checkHexa(color)) {
            this.hexColor = color;
            let [r, g, b] = Color.hexToRgb(color);
            this.r = r;
            this.g = g;
            this.b = b;
            this.rgbColor = `rgb(${r},${g},${b})`;
        }
        else if (checkRgb(color)) {
            this.hexColor = Color.rgbToHex(color);
            let [r, g, b] = Color.hexToRgb(this.hexColor);
            this.r = r;
            this.g = g;
            this.b = b;
            this.rgbColor = color;
        }
    }

    getColorByType(type = COLOR_TYPE_HEX) {
        if (type === COLOR_TYPE_HEX) {
            return this.hexColor;
        }
        if (type === COLOR_TYPE_RGB) {
            return this.rgbColor;
        }
    }
    getRGBArray() {
        return [this.r, this.g, this.b];
    }

    getComplementary() {
        const [r, g, b] = this.getRGBArray();
        const complementaryHexColor = `#${decimalToHex(255 - r)}${decimalToHex(255 - g)}${decimalToHex(255 - b)}`;

        return new Color(complementaryHexColor);
    }
    getLuminance() {
        return 0.2126 * (this.r / 255) + 0.7152 * (this.g / 255) + 0.0722 * (this.b / 255);
    }

    getTextColor() {
        let luminance = this.getLuminance();
        let color;
        if (luminance >= 0.7) {
            color = "#303030";
        }
        else if (luminance >= 0.5) {
            color = "#414141";
        }
        else if (luminance >= 0.3) {
            color = "#d3d3de";
        }
        else {
            color = "#FFFFFF"
        }
        return new Color(color);
    }




    static randomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        let rgbColor = `rgb(${r},${g},${b})`;

        return new Color(rgbColor);

    }
    static getColorType(color) {
        if (checkHexa(color)) {
            return "HEX";
        }
        else if (checkRgb(color)) {
            return "RGB"
        }
        else {
            return;
        }

    }

    /**
     * @param {Color} color1
     * @param {Color} color2
     * @param {number} ratio
     * @returns {Color} mixedColor
     */
    static mix = (color1, color2, ratio) => {
        const [r, g, b] = color1.getRGBArray();
        const [baseR, baseG, baseB] = color2.getRGBArray();

        const decimalRatio = ratio / 100;

        let calculatedR = r * decimalRatio + baseR * (1 - decimalRatio);
        let calculatedG = g * decimalRatio + baseG * (1 - decimalRatio);
        let calculatedB = b * decimalRatio + baseB * (1 - decimalRatio);



        const mixedHexColor = `#${decimalToHex(calculatedR)}${decimalToHex(calculatedG)}${decimalToHex(calculatedB)}`;
        return new Color(mixedHexColor);
    }

    static rgbToHex(rgbColor) {
        // rgb(r,g,b) 형식의 문자열을 받아서 #FFFFFF HEX 색상 값으로 변경 하는 함수.

        if (!checkRgb(rgbColor)) return rgbColor;

        const [r, g, b] = rgbColor.substring(4).slice(0, -1).split(","); // r,g,b 값만 추출


        return `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`;
    }

    static hexToRgb(hexColor) {

        let base = hexColor.substring(1);

        let r = parseInt(base.substring(0, 2), 16);
        let g = parseInt(base.substring(2, 4), 16);
        let b = parseInt(base.substring(4, 6), 16);

        return [r, g, b];
    }
}

