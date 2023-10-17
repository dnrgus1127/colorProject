import { Color } from "../../constructor/Color.js";

export function topButtonsHandlers(paletteSelector) {

    const $complementaryButton = document.getElementById("complementaryButton");

    $complementaryButton.addEventListener("click", () => {
        const complementaryColor = paletteSelector.getState().currentColor.getComplementary();
        paletteSelector.setColor(complementaryColor);
    })

    const $randomColorButton = document.getElementById("randomColorButton");

    $randomColorButton.addEventListener("click", () => {
        paletteSelector.setColor(Color.randomColor());

    })


    const $paletteMenu = document.getElementById("paletteMenu");

    $paletteMenu.addEventListener("click", (e) => {
        const clickButton = e.target.closest("button");
        if (clickButton) {
            paletteSelector.setPaletteType(clickButton.value);
        }
    })

}