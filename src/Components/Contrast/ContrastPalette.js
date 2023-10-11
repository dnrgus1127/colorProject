
import { Component } from "../../core/Component.js"
import { ContrastItem } from "./ContrastItem.js";

export class ContrastPalette extends Component {
    setup() {
        this.state = {
            itemCount: 20
        }

    }
    template() {
        return `${new Array(this.state.itemCount).fill(0).map((item, idx) =>
            `<div class="contrastPaletteItem"></div>`
        ).join(" ")}`
    }
    mounted() {
        const $contrastPalettItems = this.$target.querySelectorAll(".contrastPaletteItem");

        let { itemCount } = this.state;
        $contrastPalettItems.forEach((item, idx) => {
            new ContrastItem(item, { idx, itemCount, setColor: this.props.setColor })
        })
    }

}
