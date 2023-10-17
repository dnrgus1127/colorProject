import { Palette } from "../core/Palette.js";

export class RGBWPalette extends Palette {

    repaint(state) {
        const { currentColor, colorType } = state;
        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");
        const ratio = 40;
        const currentIdx = Math.floor(this.itemCounts / 2);
        $colorItemList.forEach((item, idx) => {
            let itemColor;

            if (idx === currentIdx) {
                itemColor = currentColor;
            }

            //r
            else if (idx % 5 === 2 && idx < currentIdx) {
                itemColor = currentColor.getIncreaseColor("r", ratio * (currentIdx - idx) / 5);
            }

            //rg
            else if (idx < currentIdx && Math.floor(idx / 5) === Math.floor(currentIdx / 5)) {
                let tmpColor = currentColor.getIncreaseColor("r", ratio / 2 * (currentIdx - idx) / 5);
                itemColor = tmpColor.getIncreaseColor("g", ratio / 2 * (currentIdx - idx) / 5);
            }

            //g
            else if (idx > currentIdx && idx % 4 === 0 && idx % 5 < 2) {
                itemColor = currentColor.getIncreaseColor("g", ratio * (idx / 5 - currentIdx / 5));
            }

            //b
            else if (idx > currentIdx && idx % 6 === 0 && idx % 5 > 2) {
                itemColor = currentColor.getIncreaseColor("b", ratio * (idx / 5 - currentIdx / 5));
            }


            //gb 
            else if (idx > currentIdx && idx % 5 === 2) {
                let tmpRatio = ratio / 2 * (idx / 5 - currentIdx / 5);
                let tmpColor = currentColor.getIncreaseColor("g", tmpRatio);
                itemColor = tmpColor.getIncreaseColor("b", tmpRatio);
            }


            this.repaintColorItem(item, itemColor, colorType);

        })

        // 색상 CSS 변수 수정
        document.documentElement.style.setProperty("--current-color", currentColor.hexColor);
        document.documentElement.style.setProperty("--element-color", currentColor.getTextColor().hexColor);
    }
}