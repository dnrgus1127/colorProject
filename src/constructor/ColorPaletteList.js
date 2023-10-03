import { ColorPalette } from "./ColorPalette.js";

export function ColorPaletteList() {
    this._colorPaletteArr = [];
    this._currentIdx = 0;
}

ColorPaletteList.prototype.getCurrentPalette = function () {
    return this._colorPaletteArr[this._currentIdx];
}

ColorPaletteList.prototype.addColorPalette = function (object) {
    if (object instanceof ColorPalette) {
        this._colorPaletteArr.push(object);
    }
}

ColorPaletteList.prototype.increaseIndex = function () {
    if (this._currentIdx + 1 >= this._colorPaletteArr.length) {
        return;
    }
    this._currentIdx++;
}

ColorPaletteList.prototype.decreaseIndex = function () {
    if (this._currentIdx < 1) {
        return;
    }
    this._currentIdx--;
}
ColorPaletteList.prototype.setIndex = function (idx) {
    if (idx >= this._colorPaletteArr.length || idx < 0) {
        return
    }
    this._currentIdx = idx;
}


ColorPaletteList.prototype.refreshPaletteList = function () {
    const $paletteList = document.getElementById("paletteList");
    const paletteArr = this._colorPaletteArr;

    $paletteList.innerHTML = "";

    paletteArr.forEach(palette => {
        const newPalette = document.createElement("div");
        newPalette.className = "palette";
        newPalette.innerText = palette.title;
        newPalette.style.backgroundImage = `linear-gradient(to left, ${palette.getMainColor().getColorByType()}, ${palette.getBaseColor().getColorByType()})`

        $paletteList.appendChild(newPalette);
    });
}
