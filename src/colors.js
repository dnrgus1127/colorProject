import { SettingObj } from "./classes.js";
import { COLOR_DATA, DEFAULT_COLOR } from "./constants.js";
import { checkHexa, checkRgb } from "./regex/validColor.js";
import { rgbToHex, hexToRgb, getTextColorByLuminance, Color, hexToRgbCode, getColorType } from "./utils/color.js";


const $colorList = document.getElementById("gridBody");
const $colorItemList = $colorList.querySelectorAll(".colorItemBox");
const $colorPicker = document.getElementById("colorPicker");
const $searchColor = document.getElementById("searchColor");
const $searchReulst = document.getElementById("searchResult");


export const changeColorItems = (value = SettingObj.mainColor.hexColor) => {
    SettingObj.mainColor = value;
    const color = SettingObj.mainColor;

    updateColorViews();

    // 비율 가중치(?)
    const mixedRatio = 100 / ($colorItemList.length);

    $colorItemList.forEach((item, idx) => {
        let mixedColor = color.colorMix({ ratio: mixedRatio * idx, baseColor: SettingObj.baseColor.hexColor });


        // 배경, 텍스트 색상 설정
        item.style.backgroundColor = mixedColor;
        const colorCode = item.querySelector(".colorCode");
        colorCode.innerText = SettingObj.colorType === "HEX" ? mixedColor : hexToRgbCode(mixedColor);

        const textColor = getTextColorByLuminance(mixedColor);
        colorCode.style.color = textColor;


        const clipboardButton = item.querySelector(".clipboardButton");
        clipboardButton.value = mixedColor;
        clipboardButton.querySelector("svg").style.fill = textColor;

    })

    // RGB 박스 값 수정
    setRgbBox(color.hexColor);

    // 색상 CSS 변수 수정
    document.documentElement.style.setProperty("--current-color", color.hexColor);
    document.documentElement.style.setProperty("--element-color", color.getTextColor());

}


// 메인 색상과 베이스 색상을 보여주는 요소들 업데이트 해주는 함수
export const updateColorViews = () => {
    let mainColor, baseColor;


    // 컬러 타입 추가될 여지가 있음
    if (SettingObj.colorType === "HEX") {
        mainColor = SettingObj.mainColor.hexColor;
        baseColor = SettingObj.baseColor.hexColor;
    }
    else if (SettingObj.colorType === "RGB") {
        mainColor = SettingObj.mainColor.rgbColor;
        baseColor = SettingObj.baseColor.rgbColor;
    }

    const $mainColorInput = document.getElementById("searchColor");
    const $mainColorPicker = document.getElementById("colorPicker");
    const $baseColorInput = document.getElementById("baseColorInput");
    const $baseColorPicker = document.getElementById("baseColorPicker");

    $mainColorInput.value = mainColor;
    $mainColorPicker.value = SettingObj.mainColor.hexColor;
    $baseColorInput.value = baseColor;
    $baseColorPicker.value = SettingObj.baseColor.hexColor;
}

$colorPicker.addEventListener("input", (e) => {
    changeColorItems(e.target.value);
})

$searchColor.addEventListener("focus", (e) => {
    e.target.setSelectionRange(0, 9999);
})

$searchColor.addEventListener("change", (e) => {
    let color = e.target.value;

    if (color.length === 0) {
        changeColorItems(DEFAULT_COLOR);
        $colorPicker.value = DEFAULT_COLOR
        return;
    }



    if (!checkRgb(color) && !checkHexa(color)) {
        alert("입력값이 올바르지 않습니다!");
        e.target.value = DEFAULT_COLOR;
        $colorPicker.value = DEFAULT_COLOR;
        return;
    }

    SettingObj.colorType = getColorType(color);

    changeColorTypeView();
    changeColorItems(color);

})
$searchColor.addEventListener("input", (e) => {
    const colorList = Object.keys(COLOR_DATA);

    const searchList = colorList.filter((item) => {
        if (item.toUpperCase().includes(e.target.value.toUpperCase())) return item;
    })


    $searchReulst.innerHTML = "";
    searchList.forEach((item) => {
        const colorItem = document.createElement("div");
        colorItem.className = "searchColorItem"
        colorItem.innerHTML = `<div style="background-color : ${COLOR_DATA[item].hex};"></div><p>${item}</p>`
        $searchReulst.appendChild(colorItem);

    })
})


function setRgbBox(hexColor) {
    const [r, g, b] = hexToRgb(hexColor);

    const rgbBox = document.getElementById("rgbBox");

    const [inputR, inputG, inputB] = rgbBox.querySelectorAll("input");

    inputR.value = r;
    inputG.value = g;
    inputB.value = b;

}



export function changeColorTypeView() {

    const hexColorList = document.querySelectorAll(".colorCode");

    hexColorList.forEach((item) => {

        let colorCode = item.tagName === "INPUT" ? item.value : item.innerText;


        if (SettingObj.colorType === "RGB" || SettingObj.colorType === "rgb") {
            const [r, g, b] = hexToRgb(colorCode);
            colorCode = `rgb(${r},${g},${b})`
            if (item.tagName !== "INPUT") {

                item.style.textTransform = "lowercase";
            }

        }
        else if (SettingObj.colorType === "HEX" || SettingObj.colorType === "hex") {
            colorCode = rgbToHex(colorCode);

            item.style.textTransform = "uppercase";

        }

        item.innerText = colorCode;
        item.value = colorCode;
    })



}