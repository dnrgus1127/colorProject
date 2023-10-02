import { COLOR_TYPE, COLOR_TYPE_HEX, DEFAULT_BASE_COLOR, DEFAULT_COLOR } from "../constants.js";
import { validateColorCode } from "../utils/regex/validColor.js";
import { Color } from "./Color.js";

/*
    생성자 함수와 CLASS를 사용한 객체 생성 방식에 각각 익숙해지기 위하여
    클래스가 아닌 생성자 함수를 이용해서 개발하였음

    특히 프로토타입 메서드와 정적 메서드에 대해서 공부하기 위한 목적
*/


function ColorPalette() {
    this._colorType = COLOR_TYPE_HEX;
    this._mainColor = new Color(DEFAULT_COLOR);
    this._baseColor = new Color(DEFAULT_BASE_COLOR);

}

/*------------------------------------ */
// 프로토타입 메서드 ---

ColorPalette.prototype.getProperties = function () {
    return {
        colorType: this._colorType,
        mainColor: this._mainColor,
        baseColor: this._baseColor,
    }
}

ColorPalette.prototype.getColorByType = function () {
    return this._colorType;
}

ColorPalette.prototype.setColorType = function (colorType) {
    //컬러 타입 일치하는지 확인
    if (!Object.values(COLOR_TYPE).includes(colorType)) return;

    this._colorType = colorType;
}


ColorPalette.prototype.getMainColor = function () {
    return this._mainColor;
}
ColorPalette.prototype.setMainColor = function (color) {
    if (color instanceof Color) {
        this._mainColor = color
    }

}

ColorPalette.prototype.getBaseColor = function () {
    return this._baseColor;
}
ColorPalette.prototype.setBaseColor = function (color) {
    if (color instanceof Color) {
        this._baseColor = color
    }
}
ColorPalette.prototype.colorExchange = function () {
    let tmp = this._baseColor;
    this._baseColor = this._mainColor;
    this._mainColor = tmp;
}

/*
    클래스에 비해서 코드의 가독성이나 코드 작성 시의 편리함이 많이 줄어든 느낌을 받았다.
    객체 프로퍼티를 강제로 은닉할 수 없어서 클래스의 #이나 , 심볼을 이용해야 한다.
*/
export { ColorPalette }