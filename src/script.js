import { ColorPalette } from "./constructor/ColorPalette.js";
import { ColorPaletteList } from "./constructor/ColorPaletteList.js";
import { topButtonsHandlers } from "./handler/buttons/topButtonsHandlers.js";
import { colorControllerHandlers } from "./handler/colorControllerHandlers.js";

import { addPaletteHandlers } from "./handler/colorPaletteHandlers.js";
import { addPaletteContainerHandler } from "./handler/paletteContainerHandler.js";
import { renderInitialElements } from "./views/renderInitialElements.js";




export const colorPaletteList = new ColorPaletteList();
colorPaletteList.addColorPalette(new ColorPalette("다크모드"));
colorPaletteList.refreshPaletteList();



renderInitialElements();
addPaletteHandlers();
colorControllerHandlers();

topButtonsHandlers();

colorPaletteList.rePaintPalette();

// 팔레트리스트 컨테이너
addPaletteContainerHandler();
//contrastContainerHandler();
