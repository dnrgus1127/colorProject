import { Color } from "../constructor/Color.js";
import { copyToClipboard } from "../utils/copyToClipboard.js";

export function addPaletteHandlers() {
    const $colorPalette = document.getElementById("colorPalette");


    //이벤트 위임
    $colorPalette.addEventListener("click", (e) => {

        let button = e.target.closest("button");
        if (button && button.classList.contains("clipboardButton")) {
            // 복사 버튼 누르면
            copyToClipboard(button.closest(".colorItemBox").querySelector(".colorCode").innerText);
        }
    })

    const $colorItemBoxList = document.querySelectorAll(".colorItemBox");

    $colorItemBoxList.forEach(item => {
        const colorCode = item.querySelector(".colorCode");
        item.addEventListener("mouseover", (e) => {
            colorCode.style.color = `white`
        })
        item.addEventListener("mouseout", (e) => {
            let textColor = new Color(colorCode.innerText);
            colorCode.style.color = textColor.getTextColor().hexColor;
        })
    })

}



