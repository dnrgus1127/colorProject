import { Color } from "../../constructor/Color.js";
import { colorPaletteList } from "../../script.js";

export function topButtonsHandlers() {

    const $complementaryButton = document.getElementById("complementaryButton");

    $complementaryButton.addEventListener("click", () => {
        const currentPalette = colorPaletteList.getCurrentPalette();
        const complementaryColor = currentPalette.getMainColor().getComplementary();

        currentPalette.setMainColor(complementaryColor);
        colorPaletteList.rePaintPalette();

    })

    const $randomColorButton = document.getElementById("randomColorButton");

    $randomColorButton.addEventListener("click", () => {
        const currentPalette = colorPaletteList.getCurrentPalette();

        currentPalette.setMainColor(Color.randomColor());
        currentPalette.setBaseColor(Color.randomColor());
        colorPaletteList.rePaintPalette();
    })

}