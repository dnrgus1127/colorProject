import { PaletteSelector } from "./component/PaletteSelector.js";
import { globalButtonHandlers } from "./handler/globalButtonHandlers.js";
import { colorControllerHandlers } from "./handler/colorControllerHandlers.js";
import { PaletteStore } from "./store/PaletteStore.js";
import { windowHandler } from "./handler/windowHandler.js";
import { initPaletteStore } from "./store/initPaletteStore.js";



export const paletteStore = new PaletteStore();
initPaletteStore();
export const paletteSelector = new PaletteSelector(document.getElementById("colorPalette"), document.getElementById("colorToolBox"));

// mainColor 조작 핸들러들
colorControllerHandlers(paletteSelector);
// 글로벌 버튼들 핸들러
globalButtonHandlers(paletteSelector);
// 윈도우 resize 이벤트
windowHandler();




