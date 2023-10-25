import { COLOR_TYPE_HEX } from "./core/constants.js";
import { PaletteSelector } from "./component/PaletteSelector.js";
import { globalButtonHandlers } from "./handler/globalButtonHandlers.js";
import { colorControllerHandlers } from "./handler/colorControllerHandlers.js";
import { PaletteStore } from "./store/PaletteStore.js";


export const paletteStore = new PaletteStore();
paletteStore.subscribe(["currentColor", "colorType", "paletteType"], () => {
    const { currentColor, colorType } = paletteStore.state;
    const $colorPicker = document.getElementById("colorPicker");
    const $searchColorInput = document.getElementById("searchColorInput");
    $colorPicker.value = currentColor.getColorByType(COLOR_TYPE_HEX);
    $searchColorInput.value = currentColor.getColorByType(colorType);
})


const $colorPalette = document.getElementById("colorPalette");
const $colorToolBox = document.getElementById("colorToolBox");
export const paletteSelector = new PaletteSelector($colorPalette, $colorToolBox);
colorControllerHandlers(paletteSelector);
globalButtonHandlers(paletteSelector);



paletteStore.notify("currentColor");
paletteStore.notify("paletteType");



let type = 1024;
function reRenderItemCounts(target) {
    if (target.innerWidth >= 1024 && type !== 1024) {
        paletteStore.setState({ key: "itemCounts", value: 25 });
        type = 1024;
    }
    if (target.innerWidth < 1024 && type !== 768) {
        paletteStore.setState({ key: "itemCounts", value: 16 });
        type = 768;
    }
    if (target.innerWidth <= 768 && type !== 480) {
        paletteStore.setState({ key: "itemCounts", value: 15 });
        type = 480;
    }
}
reRenderItemCounts(window);
window.addEventListener("resize", (e) => {
    reRenderItemCounts(e.target);
})

paletteStore.subscribe("paletteType", () => {
    const $paletteTypeWrapper = document.getElementById("paletteTypeWrapper");
    $paletteTypeWrapper.style.top = `-${paletteStore.state.paletteType * 100}% `
})


