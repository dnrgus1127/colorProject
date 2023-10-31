import { COLOR_TYPE_HEX, COLOR_TYPE_RGB } from "../core/constants.js";
import { Color } from "../core/Color.js";
import { Observer } from "../core/Observer.js";

export class PaletteStore extends Observer {
    setup() {
        this.initStore({
            key: "currentColor",
            //initValue: Color.randomColor(),
            initValue: new Color("#918c82"),
        });
        this.initStore({
            key: "colorType",
            initValue: COLOR_TYPE_HEX
        });
        this.initStore({
            key: "paletteType",
            initValue: 2,
        });
        this.initStore({
            key: "mixColor",
            initValue: new Color("#FFFFFF")
        });
        this.initStore({
            key: "rgbWeight",
            initValue: 48,
        });
        this.initStore({
            key: "itemCounts",
            initValue: 25,
        })
    }



    setColor(color) {
        if (color instanceof Color) {
            this.setState({
                key: "currentColor",
                value: color
            });
        }
    }
    setColorType(colorType) {
        if (colorType === COLOR_TYPE_HEX || colorType === COLOR_TYPE_RGB) {
            this.setState({ key: "colorType", value: colorType });
        }
    }
    setPaletteType(paletteType) {
        this.setState({ key: "paletteType", value: paletteType });
    }
    setMixColor(mixColor) {
        if (mixColor instanceof Color) {
            this.setState({
                key: "mixColor",
                value: mixColor
            })
        }
    }
}