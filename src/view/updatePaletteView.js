import { Color } from "../constructor/Color.js";
import { colorPaletteList } from "../script.js";

const $colorList = document.getElementById("colorPalette");
const $colorItemList = $colorList.querySelectorAll(".colorItemBox");



/**
 * @param mainColor Color
 * @param baseColor Color
 * @param colorType String
 * Color 객체를 받아서 해당 객체의 정보를 바탕으로 document style 업데이트를 하는 함수
 */
export const updatePaletteColor = () => {

    const { mainColor, baseColor, colorType } = colorPaletteList.getCurrentPalette().getProperties();

    updateColorValues(mainColor, baseColor, colorType);


    // 비율 가중치(?)
    const mixedRatio = 100 / ($colorItemList.length);

    $colorItemList.forEach((item, idx) => {

        const currentType = colorPaletteList.getCurrentPalette().getColorByType();

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
        clipboardButton.querySelector("svg").style.fill = textColor;

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
}


function setRgbBox(hexColor) {
    const [r, g, b] = (new Color(hexColor)).getRGBArray();

    const rgbBox = document.getElementById("rgbBox");

    const [inputR, inputG, inputB] = rgbBox.querySelectorAll("input");

    inputR.value = r;
    inputG.value = g;
    inputB.value = b;

}

