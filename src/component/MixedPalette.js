import { Color } from "../core/Color.js";
import { Palette } from "../core/Palette.js";
import { paletteStore } from "../script.js";
import { customCreateElement } from "../utils/customCreateElement.js";
import { searchColor } from "../utils/searchColor.js";


export class MixedPalette extends Palette {

    renderToolBox() {
        super.renderToolBox();
        const { mixColor, colorType } = paletteStore.state;
        const $mixColorSelector = customCreateElement("input#mixColor");
        $mixColorSelector.type = "color";
        $mixColorSelector.value = mixColor.getColorByType(colorType);

        const $mixColorInput = customCreateElement("input#mixInput");
        $mixColorInput.type = "text";
        $mixColorInput.value = mixColor.getColorByType(colorType);


        paletteStore.subscribe("mixColor", () => {
            const { mixColor, colorType } = paletteStore.state;
            $mixColorInput.value = mixColor.getColorByType(colorType);
            $mixColorSelector.value = mixColor.hexColor;
            this.repaint();
        })


        $mixColorSelector.addEventListener('input', (e) => {
            paletteStore.setMixColor(new Color(e.target.value));
        })

        $mixColorInput.addEventListener("change", (e) => {
            const text = e.target.value;
            const color = searchColor(text);

            const { mixColor } = paletteStore.state;
            if (!color) {
                paletteStore.setMixColor(mixColor);
            }
            {
                let textColorType = Color.getColorType(text);
                if (textColorType) {
                    paletteStore.setColorType(textColorType);
                }
                paletteStore.setMixColor(color);

            }
            $mixColorInput.blur();

        })

        const $wrapper = customCreateElement("div#mixWrapper");

        $wrapper.appendChild($mixColorInput);
        $wrapper.appendChild($mixColorSelector)
        this.$toolBox.appendChild($wrapper);

    }
    repaint() {
        const { currentColor, colorType, mixColor } = paletteStore.state;

        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");

        const ratio = 100 / (this.itemCounts - 1);
        $colorItemList.forEach((item, idx) => {


            item.style.border = "none";
            let itemColor;
            if (idx === 0) {
                itemColor = currentColor;
            }
            else {
                itemColor = Color.mix(mixColor, currentColor, ratio * idx);
            }

            this.repaintColorItem(item, itemColor, colorType);

        })
        super.repaint(currentColor);
    }
}