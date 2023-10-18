import { Palette } from "../core/Palette.js";
import { customCreateElement } from "../utils/customCreateElement.js";

export class ContrastPalette extends Palette {

    renderToolBox() {
        super.renderToolBox();
        const $contrastValue = customCreateElement("div#contrastValue.roboto-bold");
        this.$toolBox.appendChild($contrastValue);
    }
    repaint(state) {
        // TODO 연속적으로 repaint 발생 시 최적화 , debounce 적용 필요?
        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");

        const { currentColor, colorType } = state;

        const luminanceRatio = 255 / this.itemCounts;
        let currentIdx = this.itemCounts - Math.floor(currentColor.getLuminance() * this.itemCounts) - 1;
        if (currentIdx < 0) {
            currentIdx = 0;
        }

        $colorItemList.forEach((item, idx) => {

            let itemColor;
            item.style.border = "none";
            if (idx === currentIdx) {
                itemColor = currentColor;
                item.style.border = `1px solid ${itemColor.getTextColor().hexColor}`;
            }
            else {
                itemColor = currentColor.getChangeLuminance(luminanceRatio * (idx - currentIdx));
            }
            this.repaintColorItem(item, itemColor, colorType);

        })

        const $contrastValue = this.$toolBox.querySelector("#contrastValue");
        $contrastValue.innerText = currentColor.getLuminance().toFixed(4);

        super.repaint(currentColor);
    }


}   