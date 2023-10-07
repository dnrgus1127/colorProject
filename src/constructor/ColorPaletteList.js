import { Color } from "./Color.js";
import { ColorPalette } from "./ColorPalette.js";

export function ColorPaletteList() {
    this._colorPaletteArr = [];
    this._currentIdx = 0;
}



ColorPaletteList.prototype.getCurrentPalette = function () {
    return this._colorPaletteArr[this._currentIdx];
}

ColorPaletteList.prototype.addColorPalette = function (colorPalette) {
    if (colorPalette instanceof ColorPalette) {
        this._colorPaletteArr.push(colorPalette);
        this._currentIdx = this._colorPaletteArr.length - 1;
        this.refreshPaletteList();
        smoothTransitionPaletteColors(this.rePaintPalette.bind(this));
        this.rePaintPalette();
    }
}

ColorPaletteList.prototype.nextIndex = function () {

    if (this._currentIdx + 1 >= this._colorPaletteArr.length) {
        this.setIndex(0);
    }
    else {
        this.setIndex(this._currentIdx + 1);

    }

}

ColorPaletteList.prototype.prevIndex = function () {
    if (this._currentIdx < 1) {
        this.setIndex(this._colorPaletteArr.length - 1);
    }
    else {
        this.setIndex(this._currentIdx - 1);

    }

}
ColorPaletteList.prototype.setIndex = function (idx) {
    if (idx >= this._colorPaletteArr.length || idx < 0) {
        return
    }
    this._currentIdx = idx;
    this.refreshPaletteList();
    smoothTransitionPaletteColors(this.rePaintPalette.bind(this));
    this.rePaintPalette();

}


ColorPaletteList.prototype.refreshPaletteList = function () {
    const $paletteList = document.getElementById("paletteList");
    const paletteArr = this._colorPaletteArr;

    $paletteList.innerHTML = "";

    paletteArr.forEach((palette, idx) => {
        const newPalette = document.createElement("div");
        newPalette.className = "palette";
        if (idx === this._currentIdx) {
            newPalette.classList.add("selected");
        }
        newPalette.value = idx
        const $mainColor = document.createElement("div");
        $mainColor.className = "mainColor"
        $mainColor.style.backgroundColor = palette.getMainColor().hexColor;
        newPalette.appendChild($mainColor);

        const $baseColor = document.createElement("div");
        $baseColor.className = "baseColor";
        $baseColor.style.backgroundColor = palette.getBaseColor().hexColor;
        newPalette.appendChild($baseColor);

        $paletteList.appendChild(newPalette);
    });
    const addPalette = document.createElement("div");
    addPalette.className = "newPalette";
    addPalette.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>`;
    $paletteList.appendChild(addPalette);
}

/**
 * 페이지 다시 그리기
 */
ColorPaletteList.prototype.rePaintPalette = function () {

    const $colorList = document.getElementById("colorPalette");
    const $colorItemList = $colorList.querySelectorAll(".colorItemBox");


    const { mainColor, baseColor, colorType } = this.getCurrentPalette().getProperties();


    updateColorValues(mainColor, baseColor, colorType);


    // 비율 가중치(?)
    const mixedRatio = 100 / ($colorItemList.length);

    $colorItemList.forEach((item, idx) => {

        const currentType = this.getCurrentPalette().getColorByType();

        let mixedColor = Color.mix(mainColor, baseColor, mixedRatio * idx);
        let mixedHexColor = mixedColor.getColorByType(currentType);

        // 배경, 텍스트 색상 설정
        item.style.backgroundColor = mixedHexColor;
        const colorCode = item.querySelector(".colorCode");
        colorCode.innerText = mixedHexColor;

        const textColor = mixedColor.getTextColor().hexColor;
        colorCode.style.color = textColor;

        const clipboardButton = item.querySelector(".clipboardButton");
        clipboardButton.value = mixedHexColor;


    })

    // RGB 박스 값 수정
    setRgbBox(mainColor.hexColor);

    // 색상 CSS 변수 수정
    document.documentElement.style.setProperty("--current-color", mainColor.hexColor);
    document.documentElement.style.setProperty("--element-color", mainColor.getTextColor().hexColor);

}


// 메인 색상과 베이스 색상을 보여주는 요소들 업데이트 해주는 함수
const updateColorValues = (mainColor, baseColor, colorType) => {


    const $mainColorInput = document.getElementById("searchColorInput");
    const $mainColorPicker = document.getElementById("colorPicker");
    const $baseColorInput = document.getElementById("baseColorInput");
    const $baseColorPicker = document.getElementById("baseColorPicker");

    $mainColorInput.value = mainColor.getColorByType(colorType);
    $mainColorPicker.value = mainColor.hexColor;
    $baseColorInput.value = baseColor.getColorByType(colorType);
    $baseColorPicker.value = baseColor.hexColor;
};


function setRgbBox(hexColor) {
    const [r, g, b] = (new Color(hexColor)).getRGBArray();

    const rgbBox = document.getElementById("rgbBox");

    const [inputR, inputG, inputB] = rgbBox.querySelectorAll("input");

    inputR.value = r;
    inputG.value = g;
    inputB.value = b;

}



function smoothTransitionPaletteColors(repaintFunc) {
    const $body = document.querySelector("body");
    const $colorItemBoxList = document.querySelectorAll(".colorItemBox");



    function transitionendHandler(e) {
        if (e.target === $body || e.target.classList.contains("colorItemBox")) {
            e.target.style.transition = "";
            e.target.removeEventListener("transitionend", transitionendHandler)
        }
    }
    $body.style.transition = "background-color 1s ease-in-out";
    $body.addEventListener("transitionend", transitionendHandler)

    $colorItemBoxList.forEach(item => {
        item.style.transition = "background-color 1s ease-in-out";
        item.addEventListener("transitionend", transitionendHandler);
    });

    repaintFunc();
}

