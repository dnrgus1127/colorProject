import { COLOR_TYPE_HEX } from "../../constants.js";
import { Color } from "../../constructor/Color.js";
import { Component } from "../../core/Component.js";

export class ContrastItem extends Component {
    state;

    setup() {
        let { idx, itemCount } = this.props;
        let bgColor = Color.mix(new Color("#ffffff"), new Color("#000000"), 100 / itemCount * idx);
        this.$target.style.backgroundColor = bgColor.getColorByType(COLOR_TYPE_HEX);
        this.$target.style.color = bgColor.getTextColor().getColorByType(COLOR_TYPE_HEX);
        this.state = {
            colorCode: bgColor.getColorByType(COLOR_TYPE_HEX)
        }

    }
    template() {
        return `<p class="colorCode">${this.state.colorCode}</p>`
    }

    setEvent() {
        let { colorCode } = this.state;

        this.$target.addEventListener("click", (e) => {
            this.props.setColor(new Color(colorCode))
        })
    }

}