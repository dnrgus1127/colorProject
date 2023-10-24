
import { Color } from "../core/Color.js";
import { paletteStore } from "../script.js";

import { checkHexa, checkRgb } from "../utils/regex/validColor.js";
import { COLOR_DATA, getRegularColor } from "../utils/regularColor.js";
import { searchColor } from "../utils/searchColor.js";

export function colorControllerHandlers() {
    addColorSearchHandlers();
}

function addColorSearchHandlers() {
    const $colorPicker = document.getElementById("colorPicker");
    const $searchColorInput = document.getElementById("searchColorInput");
    const $searchResult = document.getElementById("searchResult");

    const $colorPickerIcon = document.getElementById("colorPickerIcon");

    $colorPickerIcon.addEventListener("click", () => {
        $colorPicker.focus();
        $colorPicker.click();
    })
    $colorPicker.addEventListener("input", (e) => {
        const pickedColor = new Color(e.target.value);
        paletteStore.setColor(pickedColor);
    })

    $searchColorInput.addEventListener("change", (e) => {
        let inputText = e.target.value;

        const { currentColor } = paletteStore.state;

        const color = searchColor(inputText);

        if (!color) {
            paletteStore.setColor(currentColor);
            $searchColorInput.blur();
            blurInputCss();
        }
        else {
            let textColorType = Color.getColorType(inputText);
            if (textColorType) paletteStore.setColorType(textColorType);

            paletteStore.setColor(color);
        }
        $searchColorInput.blur();
        blurInputCss();

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