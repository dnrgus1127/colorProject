import { COLOR_TYPE_HEX } from "../core/constants.js";
import { paletteStore } from "../script.js";

export function initPaletteStore() {

    paletteStore.subscribe(["currentColor", "colorType", "paletteType"], () => {
        const { currentColor, colorType } = paletteStore.state;
        const $colorPicker = document.getElementById("colorPicker");
        const $searchColorInput = document.getElementById("searchColorInput");
        $colorPicker.value = currentColor.getColorByType(COLOR_TYPE_HEX);
        $searchColorInput.value = currentColor.getColorByType(colorType);
    })

    paletteStore.subscribe("paletteType", () => {
        const $paletteTypeWrapper = document.getElementById("paletteTypeWrapper");
        $paletteTypeWrapper.style.top = `-${paletteStore.state.paletteType * 100}% `
    })


    paletteStore.notify("currentColor");
    paletteStore.notify("paletteType");
}


