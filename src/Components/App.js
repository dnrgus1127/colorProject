import { Component } from "../core/Component.js";
import { colorPaletteList } from "../script.js";
import { customCreateElement } from "../utils/customCreateElement.js";
import { ContrastContainer } from "./Contrast/ContrastContainer.js";

export class App extends Component {

    setup() {
        this.state = {
            showContrastContainer: false,
        }
    }
    template() {
        return customCreateElement("div#contrastContainer");

    }

    mounted() {
        const $contrastContainer = this.$target.querySelector("#contrastContainer");
        $contrastContainer && new ContrastContainer($contrastContainer, {
            currentColor: colorPaletteList.getCurrentPalette().getMainColor(),
            setPaletteColor: (color) => {
                colorPaletteList.getCurrentPalette().setMainColor(color);
                colorPaletteList.rePaintPalette();
            },
            showContrastContainer: this.state.showContrastContainer,
            onToggleContrast: this.onToggleContrast.bind(this)
        });
    }

    render() {
        this.$target.appendChild(this.template());
        this.mounted();
    }

    onToggleContrast() {
        this.setState({ showContrastContainer: !this.state.showContrastContainer })
    }

    setEvent() {
        this.addEvent("click", "#contrastWindowToggleButton", (e) => {
            this.onToggleContrast();
        })
    }
}