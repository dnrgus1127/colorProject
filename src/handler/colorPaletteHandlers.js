import { Color } from "../constructor/Color.js";
import { copyToClipboard } from "../utils/copyToClipboard.js";

export function addPaletteHandlers(paletteSelector) {
    const $colorPalette = document.getElementById("colorPalette");

    //이벤트 위임
    $colorPalette.addEventListener("click", (e) => {

        let button = e.target.closest("button");
        // 복사 버튼 (div.clipboardButton)
        if (button && button.classList.contains("clipboardButton")) {
            copyToClipboard(button.value);
        }

        // 교체 버튼 (div.exChangeButton)
        if (button && button.classList.contains("exChangeButton")) {
            let siblingClipboardButton = button.closest(".colorItemButtonBox").querySelector(".clipboardButton");
            paletteSelector.setColor(new Color(siblingClipboardButton.value));

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



