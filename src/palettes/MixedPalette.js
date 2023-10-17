import { Color } from "../constructor/Color.js";
import { Palette } from "../core/Palette.js";

export class MixedPalette extends Palette {
    repaint(state) {
        const { currentColor, colorType } = state;

        // ! 임시
        const mixColor = new Color("#333333");
        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");

        const ratio = 100 / (this.itemCounts - 1);
        $colorItemList.forEach((item, idx) => {
            let itemColor;
            if (idx === 0) {
                itemColor = currentColor;
            }
            else {
                itemColor = Color.mix(mixColor, currentColor, ratio * idx);
            }

            this.repaintColorItem(item, itemColor, colorType);

        })
        // 색상 CSS 변수 수정
        document.documentElement.style.setProperty("--current-color", currentColor.hexColor);
        document.documentElement.style.setProperty("--element-color", currentColor.getTextColor().hexColor);


    }
}