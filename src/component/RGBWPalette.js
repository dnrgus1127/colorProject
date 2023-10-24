import { Palette } from "../core/Palette.js";

import { paletteStore } from "../script.js";
import createCustomSlider from "../utils/customElement/customSlider.js";


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
        const { currentColor, itemCounts } = state;
        const $colorItemList = this.$target.querySelectorAll(".colorItemBox");

        if (itemCounts === 25) {
            renderItemCounts25.call(this, $colorItemList);
        }
        else if (itemCounts === 16) {
            renderItemCounts16.call(this, $colorItemList);
        }
        else if (itemCounts === 15) {
            renderItemCounts15.call(this, $colorItemList);
        }
        else {
            renderItemCounts25.call(this.$colorItemList);
        }


        super.repaint(currentColor);
    }
}


function renderItemCounts25(list) {
    const { currentColor, colorType, itemCounts, rgbWeight } = paletteStore.state;
    const currentIdx = Math.floor(itemCounts / 2);
    const weight = rgbWeight;
    const per = 0.25;

    list.forEach((item, idx) => {
        let itemColor;
        let floor = Math.floor(idx / 5);
        if (idx === currentIdx) {
            itemColor = currentColor;
        }
        else if (idx % 5 === 2 && idx < currentIdx) {
            itemColor = currentColor.getIncreaseColor("r", weight * (currentIdx - idx) / 5);
        }
        else if (idx > currentIdx && idx % 4 === 0 && idx % 5 < 2) {
            itemColor = currentColor.getIncreaseColor("g", weight * (currentIdx % 5 - idx % 5));
        }
        else if (idx > currentIdx && idx % 6 === 0 && idx % 5 > 2) {
            itemColor = currentColor.getIncreaseColor("b", weight * (idx % 5 - currentIdx % 5));
        }
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
    }
    )
}

function renderItemCounts16(list) {
    const { currentColor, colorType, rgbWeight } = paletteStore.state;
    const per = 0.5;
    list.forEach((item, idx) => {
        let itemColor;
        let floor = Math.floor(idx / 4);

        if (idx === 0) {
            itemColor = currentColor;
        }
        else if (floor === 0) {
            itemColor = currentColor.getIncreaseColor("r", rgbWeight * per * idx);
        }
        else if (idx % 4 === 0) {
            itemColor = currentColor.getIncreaseColor("g", rgbWeight * per * Math.floor(idx / 4));
        }
        else if (idx % 5 === 0) {
            itemColor = currentColor.getIncreaseColor("b", rgbWeight * per * Math.floor(idx / 4));
        }
        else if (floor === 3) {
            if (idx % 4 === 1) {

                let tmpColor = currentColor.getIncreaseColor("g", rgbWeight * 3 * per);
                itemColor = tmpColor.getIncreaseColor("b", rgbWeight * 2 * per);
            }
            else {
                let tmpColor = currentColor.getIncreaseColor("b", rgbWeight * 3 * per);
                itemColor = tmpColor.getIncreaseColor("g", rgbWeight * 2 * per);
            }
        }
        else if (idx % 4 === 3) {
            if (idx === 7) {
                let tmpColor = currentColor.getIncreaseColor("r", rgbWeight * 3 * per);
                itemColor = tmpColor.getIncreaseColor("b", rgbWeight * 2 * per);
            }
            else {
                let tmpColor = currentColor.getIncreaseColor("b", rgbWeight * 3 * per);
                itemColor = tmpColor.getIncreaseColor("r", rgbWeight * 2 * per);
            }
        }

        if (idx === 6) {
            let tmpColor = currentColor.getIncreaseColor("r", rgbWeight * 2 * per);
            itemColor = tmpColor.getIncreaseColor("b", rgbWeight * 2 * per);
        }
        if (idx === 9) {
            let tmpColor = currentColor.getIncreaseColor("g", rgbWeight * 2 * per);
            itemColor = tmpColor.getIncreaseColor("b", rgbWeight * 2 * per);
        }

        this.repaintColorItem(item, itemColor, colorType);
    })


}


function renderItemCounts15(list) {
    const { currentColor, colorType, rgbWeight } = paletteStore.state;

    const per = 0.5;
    list.forEach((item, idx) => {
        let itemColor;
        let floor = Math.floor(idx / 3);
        if (floor === 4) {
            itemColor = currentColor;
        }
        else if (idx % 3 === 0) {
            itemColor = currentColor.getIncreaseColor("r", rgbWeight * per * (4 - Math.floor(idx / 3)));
        }
        else if (idx % 3 === 1) {
            itemColor = currentColor.getIncreaseColor("g", rgbWeight * per * (4 - Math.floor(idx / 3)));
        }
        else {
            itemColor = currentColor.getIncreaseColor("b", rgbWeight * per * (4 - Math.floor(idx / 3)));
        }
        this.repaintColorItem(item, itemColor, colorType);

    })
}