import { COLOR_TYPE_HEX } from "../constants.js";
import { Color } from "../constructor/Color.js";
import { ContrastPalette } from "../palettes/ContrastPalette.js";
import { MixedPalette } from "../palettes/MixedPalette.js";
import { RGBWPalette } from "../palettes/RGBWPalette.js";


export class PaletteSelector {
    $target
    constructor(paletteViewer) {
        this.$target = paletteViewer;
        this.state = {
            currentColor: new Color("#121212"),
            colorType: COLOR_TYPE_HEX,
        };
        this.paletteType = 2;
        this.paletteList = [];
        this.paletteList.push(new ContrastPalette(this.$target));
        this.paletteList.push(new MixedPalette(this.$target));
        this.paletteList.push(new RGBWPalette(this.$target));
        this.render();
    }
    render(init) {
        this.paletteList[this.paletteType].render(this.state, init);
    }
    setState() {
        // setState로 추상화하면서 Debounce 걸면 성능 개선 가능할 듯
    }

    setColor(color) {
        this.state = {
            ...this.state,
            currentColor: color,
        };
        this.notifyColor();
        this.render();
    }
    setColorType(colorType) {
        this.state = {
            ...this.state,
            colorType: colorType,
        }
        this.render();
    }
    getState() {
        return this.state;
    }

    setPaletteType(index) {
        if (index > this.paletteList.length || index === this.paletteType) {
            return;
        }
        this.paletteType = index;
        this.render(true);
    }

    subscribe() {

    }
    notifyColor() {
        const $colorPicker = document.getElementById("colorPicker");
        const $searchColorInput = document.getElementById("searchColorInput");
        $colorPicker.value = this.state.currentColor.getColorByType(COLOR_TYPE_HEX);
        $searchColorInput.value = this.state.currentColor.getColorByType(this.state.colorType);
    }
}
