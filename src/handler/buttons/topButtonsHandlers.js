import { Color } from "../../constructor/Color.js";
import { updatePaletteColor } from "../../view/updatePaletteView.js";

export function topButtonsHandlers(currentPalette) {

    const $complementaryButton = document.getElementById("complementaryButton");

    $complementaryButton.addEventListener("click", () => {
        const complementaryColor = currentPalette.getMainColor().getComplementary();
        currentPalette.setMainColor(complementaryColor);
        updatePaletteColor();

    })

    const $randomColorButton = document.getElementById("randomColorButton");

    $randomColorButton.addEventListener("click", () => {
        currentPalette.setMainColor(Color.randomColor());
        currentPalette.setBaseColor(Color.randomColor());
        updatePaletteColor();
    })

}