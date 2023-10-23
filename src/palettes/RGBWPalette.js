import { Palette } from "../core/Palette.js";
import createCustomSlider from "../customElement/customSlider.js";
import { paletteStore } from "../script.js";
import { customCreateElement } from "../utils/customCreateElement.js";

export class RGBWPalette extends Palette {

    renderToolBox() {
        super.renderToolBox();
        const $weightSlider = createCustomSlider({ max: 255, min: 0, initValue: paletteStore.state.rgbWeight });
        this.$toolBox.appendChild($weightSlider);

        $weightSlider.addEventListener("input", e => {
            paletteStore.setState({ key: "rgbWeight", value: e.target.value });
            this.repaint();
        })
    }
    repaint(state = paletteStore.state) {
        const { currentColor, colorType } = state;
        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");
        const weight = paletteStore.state.rgbWeight;
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
                itemColor = currentColor.getIncreaseColor("r", weight * (currentIdx - idx) / 5);
            }
            //g
            else if (idx > currentIdx && idx % 4 === 0 && idx % 5 < 2) {
                itemColor = currentColor.getIncreaseColor("g", weight * (currentIdx % 5 - idx % 5));
            }

            //b
            else if (idx > currentIdx && idx % 6 === 0 && idx % 5 > 2) {
                itemColor = currentColor.getIncreaseColor("b", weight * (idx % 5 - currentIdx % 5));
            }

            // 각 층별 채우기
            else if (floor === 0) {
                let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                let distanceX = Math.abs(currentIdx % 5 - idx % 5);
                let tmpColor = currentColor.getIncreaseColor("r", (2 - per * distanceX) * weight);
                itemColor = tmpColor.getIncreaseColor(rgbType, per * distanceX * weight);
            }
            else if (floor === 1) {
                let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                let distanceX = Math.abs(currentIdx % 5 - idx % 5);
                let tmpColor = currentColor.getIncreaseColor("r", (0.5 + per * distanceX) * weight);
                itemColor = tmpColor.getIncreaseColor(rgbType, (- 0.5 + 3 * per * distanceX) * weight);
            }
            else if (floor === 2) {
                let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                let distanceX = Math.abs(currentIdx % 5 - idx % 5);
                let tmpColor = currentColor.getIncreaseColor("r", (per * distanceX) * weight);
                itemColor = tmpColor.getIncreaseColor(rgbType, 3 * per * distanceX * weight);
            }

            else if (floor === 3) {
                if (idx % 4 === 3) {
                    let rgbType = idx % 5 > currentIdx % 5 ? "b" : "g";
                    let tmpColor = currentColor.getIncreaseColor("r", per * weight);
                    itemColor = tmpColor.getIncreaseColor(rgbType, 7 * per * weight);
                }
                else {
                    let tmpColor = currentColor.getIncreaseColor("g", 0.5 * weight);
                    itemColor = tmpColor.getIncreaseColor("b", 0.5 * weight)
                }
            }
            else if (floor === 4) {
                let tmpColor;

                if (idx % 5 === 2) {
                    tmpColor = currentColor.getIncreaseColor("g", weight);
                    itemColor = tmpColor.getIncreaseColor("b", weight)
                }
                else {
                    let rgbType = idx % 5 > 2 ? "b" : "g";
                    let rgbType2 = idx % 5 > 2 ? "g" : "b";
                    tmpColor = currentColor.getIncreaseColor(rgbType, 1.5 * weight);
                    itemColor = tmpColor.getIncreaseColor(rgbType2, 0.5 * weight)
                }
            }

            this.repaintColorItem(item, itemColor, colorType);

        })

        super.repaint(currentColor);
    }
}