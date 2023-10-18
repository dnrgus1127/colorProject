import { Color } from "../constructor/Color.js";
import { Palette } from "../core/Palette.js";

export class RGBWPalette extends Palette {

    repaint(state) {
        const { currentColor, colorType } = state;
        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");
        const ratio = 24;
        const currentIdx = Math.floor(this.itemCounts / 2);

        const per = 0.25;
        $colorItemList.forEach((item, idx) => {
            let itemColor;
            let floor = Math.floor(idx / 5);
            if (idx === currentIdx) {
                itemColor = currentColor;
            }

            //r
            else if (idx % 5 === 2 && idx < currentIdx) {
                itemColor = currentColor.getIncreaseColor("r", ratio * (currentIdx - idx) / 5);
            }
            //g
            else if (idx > currentIdx && idx % 4 === 0 && idx % 5 < 2) {
                itemColor = currentColor.getIncreaseColor("g", ratio * (currentIdx % 5 - idx % 5));
            }

            //b
            else if (idx > currentIdx && idx % 6 === 0 && idx % 5 > 2) {
                itemColor = currentColor.getIncreaseColor("b", ratio * (idx % 5 - currentIdx % 5));
            }

            // 각 층별 채우기
            else if (floor === 0) {
                let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                let distanceX = Math.abs(currentIdx % 5 - idx % 5);
                let tmpColor = currentColor.getIncreaseColor("r", (2 - per * distanceX) * ratio);
                itemColor = tmpColor.getIncreaseColor(rgbType, per * distanceX * ratio);
            }
            else if (floor === 1) {
                let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                let distanceX = Math.abs(currentIdx % 5 - idx % 5);
                let tmpColor = currentColor.getIncreaseColor("r", (0.5 + per * distanceX) * ratio);
                itemColor = tmpColor.getIncreaseColor(rgbType, (- 0.5 + 3 * per * distanceX) * ratio);
            }
            else if (floor === 2) {
                let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                let distanceX = Math.abs(currentIdx % 5 - idx % 5);
                let tmpColor = currentColor.getIncreaseColor("r", (per * distanceX) * ratio);
                itemColor = tmpColor.getIncreaseColor(rgbType, 3 * per * distanceX * ratio);
            }

            else if (floor === 3) {
                if (idx % 4 === 3) {
                    let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                    let tmpColor = currentColor.getIncreaseColor("r", per * ratio);
                    itemColor = tmpColor.getIncreaseColor(rgbType, 7 * per * ratio);
                }
                else {
                    let tmpColor = currentColor.getIncreaseColor("g", 0.5 * ratio);
                    itemColor = tmpColor.getIncreaseColor("b", 0.5 * ratio)
                }
            }
            else if (floor === 4) {
                let tmpColor;

                if (idx % 5 === 2) {
                    tmpColor = currentColor.getIncreaseColor("g", ratio);
                    itemColor = tmpColor.getIncreaseColor("b", ratio)
                }
                else {
                    let rgbType = idx % 5 > 2 ? "b" : "g";
                    let rgbType2 = idx % 5 > 2 ? "g" : "b";
                    tmpColor = currentColor.getIncreaseColor(rgbType, 1.5 * ratio);
                    itemColor = tmpColor.getIncreaseColor(rgbType2, 0.5 * ratio)
                }
            }

            this.repaintColorItem(item, itemColor, colorType);

        })

        super.repaint(currentColor);
    }
}