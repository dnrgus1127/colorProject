import { ColorPalette } from "./constructor/ColorPalette.js";
import { ColorPaletteList } from "./constructor/ColorPaletteList.js";
import { topButtonsHandlers } from "./handler/buttons/topButtonsHandlers.js";
import { colorControllerHandlers } from "./handler/colorControllerHandlers.js";
import { addPaletteHandlers } from "./handler/colorPaletteHandlers.js";
import { updatePaletteColor } from "./view/updatePaletteView.js";




export const colorPaletteList = new ColorPaletteList();
colorPaletteList.addColorPalette(new ColorPalette());
const currentPalette = colorPaletteList.getCurrentPalette();

addPaletteHandlers();
colorControllerHandlers(colorPaletteList.getCurrentPalette());

topButtonsHandlers(currentPalette);

updatePaletteColor();






