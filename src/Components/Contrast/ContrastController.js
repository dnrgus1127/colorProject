import { COLOR_TYPE_HEX } from "../../constants.js";
import { Component } from "../../core/Component.js";
import { RGBRangeController } from "../RGBRangeController.js";

export class ContrastController extends Component {

    setup() {

    }

    template() {
        const currentColor = this.props.getCurrentColor;
        return `
            <button id="closeContrastButton"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg></button>
            <input id="contrastColorInput" placeholder="색상 코드" value="${currentColor.getColorByType(COLOR_TYPE_HEX)}"/>
            <div id="rgbRangeController"></div> 
        `
    }

    mounted() {
        new RGBRangeController(this.$target.querySelector("#rgbRangeController"));
    }

    setEvent() {
        this.addEvent("click", "#closeContrastButton", (e) => {
            this.props.onToggleContrast();
        })
    }

}