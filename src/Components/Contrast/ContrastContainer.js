import { COLOR_TYPE_HEX } from "../../constants.js";
import { Component } from "../../core/Component.js";
import { ContrastController } from "./ContrastController.js";
import { ContrastPalette } from "./ContrastPalette.js";

export class ContrastContainer extends Component {
    setup() {
        this.state = {
            currentColor: this.props.currentColor,
        }
    }
    template() {
        this.$target.style.top = this.props.showContrastContainer ? 0 : "100vh";
        this.$target.style.backgroundColor = this.state.currentColor.getColorByType(COLOR_TYPE_HEX);
        return `<div id="contrastPalette"></div>
                <div id="contrastController"></div>`
    }
    mounted() {
        new ContrastPalette(this.$target.querySelector("#contrastPalette"), {
            setColor: this.setColor.bind(this)
        });
        new ContrastController(this.$target.querySelector("#contrastController"), {
            getCurrentColor: this.getCurrentColor,
            onToggleContrast: this.props.onToggleContrast
        });
    }

    get getCurrentColor() {
        return this.state.currentColor;
    }

    setColor(color) {
        this.setState({
            ...this.state,
            currentColor: color,
        })
        this.props.setPaletteColor(color);
    }

}