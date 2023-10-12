import { Component } from "../core/Component.js";
import { colorPaletteList } from "../script.js";
import { ContrastContainer } from "./Contrast/ContrastContainer.js";

export class App extends Component {

    setup() {
        this.state = {
            showContrastContainer: false,
            prevHTML: this.$target.innerHTML,
        }
    }
    template() {
        return this.state.prevHTML + `<div id="contrastContainer"></div>`
    }

    mounted() {
        const $contrastContainer = this.$target.querySelector("#contrastContainer");
        new ContrastContainer($contrastContainer, {
            currentColor: colorPaletteList.getCurrentPalette().getMainColor(),
            setPaletteColor: (color) => {
                colorPaletteList.getCurrentPalette().setMainColor(color);
                colorPaletteList.rePaintPalette();
            },
            showContrastContainer: this.state.showContrastContainer,
            onToggleContrast: this.onToggleContrast.bind(this)
        });
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