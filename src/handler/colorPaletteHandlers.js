import { copyToClipboard } from "../utils/copyToClipboard.js";

export function addPaletteHandlers() {
    const $colorPalette = document.getElementById("colorPalette");

    addClipboardButtonHandler($colorPalette);

    $colorPalette.addEventListener("click", (e) => {
        if (e.target.className === "colorItemBox") {
            console.log("기능 추가 전");
        }
    })
}

function addClipboardButtonHandler($colorPalette) {
    const $clipboardButtonList = $colorPalette.querySelectorAll(".clipboardButton");

    $clipboardButtonList.forEach((button) => {
        button.addEventListener("click", () => {
            copyToClipboard(button.value);
        })
    })
}

