import { COLOR_TYPE_HEX, DEFAULT_BASE_COLOR } from "../constants.js";
import { Color } from "../constructor/Color.js";
import { colorPaletteList } from "../script.js";
import { checkHexa, checkRgb, validateColorCode } from "../utils/regex/validColor.js";
import { COLOR_DATA, getRegularColor } from "../utils/regularColor.js";

export function colorControllerHandlers() {

    addColorSearchHandlers();
    addColorToolBoxHandlers();
}

function addColorSearchHandlers() {
    const $colorPicker = document.getElementById("colorPicker");
    const $searchColorInput = document.getElementById("searchColorInput");
    const $searchResult = document.getElementById("searchResult");

    $colorPicker.addEventListener("input", (e) => {
        const pickedColor = new Color(e.target.value);
        colorPaletteList.getCurrentPalette().setMainColor(pickedColor);
        colorPaletteList.rePaintPalette();
    })

    $searchColorInput.addEventListener("change", (e) => {
        let inputText = e.target.value;

        const currentPalette = colorPaletteList.getCurrentPalette();
        const { mainColor, colorType } = currentPalette.getProperties();


        if (inputText.length === 0) {
            $searchColorInput.value = mainColor.getColorByType(colorType);
            $searchColorInput.blur();
            blurInputCss();

            return;
        }

        // 정규 색상 검사 ex) white , blue, grey, green, lightgrey 등
        const regularColor = getRegularColor(inputText);
        if (regularColor) {
            inputText = regularColor.getColorByType(colorType);
        }

        // #ffffff, rgb 형식 검사
        if (!checkRgb(inputText) && !checkHexa(inputText)) return;


        $searchColorInput.blur();


        if (!regularColor) currentPalette.setColorType = Color.getColorType(inputText);

        changeColorTypeView(currentPalette.getColorByType());

        currentPalette.setMainColor(new Color(inputText));
        colorPaletteList.rePaintPalette(); blurInputCss();
        $searchResult.innerHTML = ""


    })
    // 연관 검색 색상 목록 추가
    $searchColorInput.addEventListener("input", (e) => {


        if (e.target.value.length === 0) return;
        const colorDataKyes = Object.keys(COLOR_DATA);

        const searchList = colorDataKyes.filter((item) => {
            if (item.toUpperCase().includes(e.target.value.toUpperCase())) return item;
        })


        $searchResult.innerHTML = "";
        const resultColorCss = window.getComputedStyle($searchResult).getPropertyValue("background-color");
        $searchResult.style.color = (new Color(resultColorCss)).getTextColor().hexColor;
        searchList.forEach((item, idx) => {
            if (idx > 5) return;
            const colorItem = document.createElement("div");
            colorItem.className = "searchColorInputItem"
            colorItem.innerHTML = `<div style="background-color : ${COLOR_DATA[item].hex};"></div><p>${item}</p>`
            colorItem.addEventListener("click", () => {
                $searchColorInput.value = item;
                const changeEvent = new Event("change", {
                    bubbles: true,
                    cancelable: true,
                })
                $searchColorInput.dispatchEvent(changeEvent);
            })

            $searchResult.appendChild(colorItem);

        })
    })


    let searchIdx = -1;

    $searchColorInput.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
            searchIdx = -1;
            $searchResult.innerHTML = ""
            return;
        }

        const searchColorInputItemList = $searchResult.querySelectorAll(".searchColorInputItem");

        if (e.key === "ArrowDown") {

            if (searchIdx < searchColorInputItemList.length - 1) {
                searchIdx++;
            }

        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (searchIdx >= 0) {

                searchIdx--;
            }
        }

        $searchColorInput.value = searchColorInputItemList[searchIdx] ? searchColorInputItemList[searchIdx].querySelector("p").innerText : $searchColorInput.value;


        searchColorInputItemList[searchIdx - 1] && searchColorInputItemList[searchIdx - 1].classList.remove("selected");
        searchColorInputItemList[searchIdx] && searchColorInputItemList[searchIdx].classList.add("selected");
        searchColorInputItemList[searchIdx + 1] && searchColorInputItemList[searchIdx + 1].classList.remove("selected");

    })


    $searchColorInput.addEventListener("focus", () => {
        focusInputCss();
    })


    document.addEventListener("mousedown", (e) => {
        const $searchSelectionContainer = document.getElementById("searchSelectionContainer");

        const clickElement = e.target;
        if (!$searchSelectionContainer.contains(clickElement)) {
            blurInputCss();
        }
        else {
            $searchResult.innerHTML = ""
        }
    })



    function focusInputCss() {
        $searchResult.style.display = "block"
        $searchColorInput.style.backgroundColor = "var(--element-color)"
        $searchColorInput.style.color = "var(--current-color)"
    }
    function blurInputCss() {
        $searchResult.style.display = "none";
        $searchColorInput.style.backgroundColor = "initial"
        $searchColorInput.style.color = "var(--element-color)"
    }


}


function addColorToolBoxHandlers() {
    const $baseColorInput = document.getElementById("baseColorInput");
    $baseColorInput.value = DEFAULT_BASE_COLOR;
    const $baseColorPicker = document.getElementById("baseColorPicker");
    $baseColorPicker.value = DEFAULT_BASE_COLOR;

    const $changeColorButton = document.getElementById("changeColorButton");


    // Base, Main 컬러 상호 교체

    $changeColorButton.addEventListener("click", () => {
        colorPaletteList.getCurrentPalette().colorExchange();
        colorPaletteList.rePaintPalette();
    })


    $baseColorPicker.addEventListener("input", (e) => {
        const color = new Color(e.target.value);
        $baseColorInput.value = color.getColorByType(COLOR_TYPE_HEX);
        colorPaletteList.getCurrentPalette().setBaseColor(color);
        colorPaletteList.rePaintPalette();

    })
    $baseColorInput.addEventListener("change", (e) => {

        if (!validateColorCode(e.target.value)) {
            alert("색상 값이 올바르지 않습니다.");
            $baseColorInput.value = convertColorByType(DEFAULT_BASE_COLOR, SettingObj.colorType);
            return;
        }
        const color = new Color(e.target.value);

        $baseColorPicker.value = color.getColorByType(COLOR_TYPE_HEX);
        colorPaletteList.getCurrentPalette().setBaseColor(color);
        colorPaletteList.rePaintPalette();

    })


    const $colorType = document.getElementById("colorType");
    $colorType.addEventListener("click", () => {
        const currentPalette = colorPaletteList.getCurrentPalette();

        $colorType.innerText = currentPalette.getColorByType();
        currentPalette.setColorType($colorType.innerText === "HEX" ? "RGB" : "HEX");

        changeColorTypeView(currentPalette.getColorByType());
    })

    const $colorPickerIcon = document.getElementById("colorPickerIcon");

    $colorPickerIcon.addEventListener("click", () => {
        colorPicker.focus();
        colorPicker.click();
    })






}




// TODO colorPalette 기반으로 리팩토링
export function changeColorTypeView(colorType) {

    const hexColorList = document.querySelectorAll(".colorCode");


    hexColorList.forEach((item) => {

        let colorCode = item.tagName === "INPUT" ? item.value : item.innerText;

        const color = new Color(colorCode);

        item.innerText = color.getColorByType(colorType);
        item.value = color.getColorByType(colorType);
    })



}