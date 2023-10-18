import { ColorPalette } from "./constructor/ColorPalette.js";
import { ColorPaletteList } from "./constructor/ColorPaletteList.js";
import { PaletteSelector } from "./core/PaletteSelector.js";
import { topButtonsHandlers } from "./handler/buttons/topButtonsHandlers.js";
import { colorControllerHandlers } from "./handler/colorControllerHandlers.js";

import { addPaletteHandlers } from "./handler/colorPaletteHandlers.js";





export const colorPaletteList = new ColorPaletteList();
colorPaletteList.addColorPalette(new ColorPalette("다크모드"));
//colorPaletteList.refreshPaletteList();


const $colorPalette = document.getElementById("colorPalette");
const $colorToolBox = document.getElementById("colorToolBox");
export const paletteSelector = new PaletteSelector($colorPalette, $colorToolBox);
addPaletteHandlers(paletteSelector);
colorControllerHandlers(paletteSelector);
topButtonsHandlers(paletteSelector);

// 팔레트리스트 컨테이너
//addPaletteContainerHandler();
//contrastContainerHandler();
