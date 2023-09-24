import { SettingObj } from "./classes.js";
import { changeColorItems, changeColorTypeView } from "./colors.js";
import { DEFAULT_BASECOLOR } from "./constants.js";
import { checkColorCode } from "./regex/validColor.js";
import { convertColorByType } from "./setting/setting.js";
import { getComplementaryColor } from "./utils/color.js";
import { copyToClipboard } from "./utils/copyToClipboard.js";


changeColorItems();

const clipboardButtonList = document.querySelectorAll(".clipboardButton");

clipboardButtonList.forEach((item, idx) => {
    item.addEventListener("click", (e) => {
        copyToClipboard(item.value);
    })
})

const colorPickerIcon = document.getElementById("colorPickerIcon");

const colorPicker = document.getElementById("colorPicker");


colorPickerIcon.addEventListener("click", () => {
    colorPicker.focus();
    colorPicker.click();
})


const colorType = document.getElementById("colorType");


colorType.addEventListener("click", () => {
    colorType.innerText = SettingObj.colorType;
    SettingObj.onToggleColorType();
    changeColorTypeView();

})



// Setting BaseColor

const baseColorInput = document.getElementById("baseColorInput");
baseColorInput.value = DEFAULT_BASECOLOR;
const baseColorPicker = document.getElementById("baseColorPicker");
baseColorPicker.value = DEFAULT_BASECOLOR;


baseColorInput.addEventListener("change", (e) => {
    if (!checkColorCode(e.target.value)) {
        alert("색상 값이 올바르지 않습니다.");
        baseColorInput.value = convertColorByType(DEFAULT_BASECOLOR, SettingObj.colorType);
        return;
    }
    baseColorPicker.value = convertColorByType(e.target.value, "HEX");
    SettingObj.baseColor = baseColorPicker.value;
    changeColorItems(SettingObj.mainColor.hexColor);

})

baseColorPicker.addEventListener("input", (e) => {
    baseColorInput.value = convertColorByType(e.target.value, SettingObj.colorType);
    SettingObj.baseColor = baseColorInput.value;
    changeColorItems(SettingObj.mainColor.hexColor);

})



// 보색 적용

const $complementaryBox = document.getElementById("complementaryBox");
$complementaryBox.addEventListener("click", () => {
    changeColorItems(getComplementaryColor(SettingObj.mainColor.hexColor));
})



// Base, Main 컬러 상호 교체

const $changeColorButton = document.getElementById("changeColorButton");
$changeColorButton.addEventListener("click", () => {
    SettingObj.exchangeColors();
    changeColorItems();
})


