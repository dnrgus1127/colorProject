
import { DEFAULT_BASECOLOR } from "../constants.js";
import { checkHexa, checkRgb } from "../regex/validColor.js";

export class Color {
    constructor(color) {
        if (checkHexa(color)) {
            this.hexColor = color;
            let [r, g, b] = hexToRgb(color);
            this.r = r;
            this.g = g;
            this.b = b;
            this.rgbColor = `rgb(${r},${g},${b})`;
        }
        else if (checkRgb(color)) {
            this.hexColor = rgbToHex(color);
            let [r, g, b] = hexToRgb(this.hexColor);
            this.r = r;
            this.g = g;
            this.b = b;
            this.rgbColor = color;
        }
    }

    getComplementary() {
        return getComplementaryColor(this.hexColor);
    }
    colorMix({ hexColor = this.hexColor, baseColor = DEFAULT_BASECOLOR, ratio }) {
        return colorMix({ hexColor: hexColor, ratio: ratio, baseColor: baseColor })
    }
    getTextColor() {
        return getTextColorByLuminance(this.hexColor);
    }


}


const getColorType = (color) => {
    if (checkHexa(color)) {
        return "HEX";
    }
    else if (checkRgb(color)) {
        return "RGB"
    }
    return null;

}



const rgbToHex = (rgbColor) => {
    // rgb(r,g,b) 형식의 문자열을 받아서 #FFFFFF HEX 색상 값으로 변경 하는 함수.

    if (!checkRgb(rgbColor)) return rgbColor;

    const [r, g, b] = rgbColor.substring(4).slice(0, -1).split(","); // r,g,b 값만 추출


    return `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`;
}

const hexToRgbCode = (hexColor) => {
    const [r, g, b] = hexToRgb(hexColor);

    return `rgb(${r},${g},${b})`;
}



const decimalToHex = (number) => {
    let result = Math.ceil(number).toString(16);


    if (result.length < 2) {
        return `0` + result;
    }
    return result;

}

const hexToRgb = (hexColor) => {
    let base = hexColor.substring(1);

    let r = parseInt(base.substring(0, 2), 16);
    let g = parseInt(base.substring(2, 4), 16);
    let b = parseInt(base.substring(4, 6), 16);

    return [r, g, b];
}


function getComplementaryColor(hexColor) {
    const [r, g, b] = hexToRgb(hexColor);

    return `#${decimalToHex(255 - r)}${decimalToHex(255 - g)}${decimalToHex(255 - b)}`


}


const colorMix = ({ baseColor = DEFAULT_BASECOLOR, hexColor, ratio }) => {
    const [r, g, b] = hexToRgb(hexColor);
    const [baseR, baseG, baseB] = hexToRgb(baseColor);

    const decimalRatio = ratio / 100;

    let calculatedR = r * decimalRatio + baseR * (1 - decimalRatio);
    let calculatedG = g * decimalRatio + baseG * (1 - decimalRatio);
    let calculatedB = b * decimalRatio + baseB * (1 - decimalRatio);



    return `#${decimalToHex(calculatedR)}${decimalToHex(calculatedG)}${decimalToHex(calculatedB)}`
}


function calculateRelativeLuminance(hexColor) {

    const [R, G, B] = hexToRgb(hexColor);

    // 명암비 구하는 공식
    return 0.2126 * (R / 255) + 0.7152 * (G / 255) + 0.0722 * (B / 255);
}

function getTextColorByLuminance(hexColor) {
    const luminance = calculateRelativeLuminance(hexColor);
    if (luminance >= 0.7) {
        return "var(--text-black)";
    }
    if (luminance >= 0.5) {
        return "var(--text-black2";
    }
    if (luminance >= 0.3) {
        return " var(--text-white)";
    }

    return "white";

}



export { rgbToHex, getColorType, hexToRgb, hexToRgbCode, colorMix, decimalToHex, getComplementaryColor, calculateRelativeLuminance, getTextColorByLuminance };

