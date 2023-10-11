import { COLOR_TYPE_HEX } from "../constants.js";
import { Color } from "../constructor/Color.js";
import { customCreateElement } from "../utils/customCreateElement.js";

export function contrastContainerHandler() {
    const $contrastContainer = document.getElementById('contrastContainer');

    $contrastContainer.querySelector("button").addEventListener("click", (e) => {
        renderContrastPaletteItems();
    })
}


function renderContrastPaletteItems(itemCount = 20) {
    const $contrastPalette = document.getElementById("contrastPalette");
    (new Array(itemCount).fill(0)).forEach((item, idx) => {
        const paletteItem = customCreateElement("div.contrastPaletteItem");
        paletteItem.style.backgroundColor = Color.mix(new Color("#ffffff"), new Color("#000000"), 100 / itemCount * idx).getColorByType(COLOR_TYPE_HEX);
        $contrastPalette.appendChild(paletteItem);


    })
}