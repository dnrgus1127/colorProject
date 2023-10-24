import { Color } from "../core/Color.js";
import { PaletteTypeLength } from "../core/constants.js";
import { paletteStore } from "../script.js";

export function globalButtonHandlers() {

    const $complementaryButton = document.getElementById("complementaryButton");

    $complementaryButton.addEventListener("click", () => {
        const complementaryColor = paletteStore.state.currentColor.getComplementary();
        paletteStore.setColor(complementaryColor);
    })

    const $randomColorButton = document.getElementById("randomColorButton");

    $randomColorButton.addEventListener("click", () => {
        paletteStore.setColor(Color.randomColor());

    })


    const $paletteMenu = document.getElementById("paletteMenu");

    $paletteMenu.addEventListener("click", (e) => {
        const clickButton = e.target.closest("button");
        if (clickButton) {
            paletteStore.setPaletteType(Number(clickButton.value));

        }
    })


    const $body = document.querySelector("body");

    $body.addEventListener("click", (e) => {
        const clickElement = e.target;

        const globalPaletteTypeButton = clickElement.closest(".global-paletteType-button");
        if (globalPaletteTypeButton) {
            const { paletteType } = paletteStore.state;

            if (globalPaletteTypeButton.id === "prevPaletteTypeButton") {
                paletteStore.setPaletteType(paletteType === 0 ? PaletteTypeLength - 1 : paletteType - 1);
            }
            else {
                paletteStore.setPaletteType(paletteType === PaletteTypeLength - 1 ? 0 : paletteType + 1);
            }
        }
    })


}