import { Color } from "../core/Color.js";
import { ContrastPalette } from "./ContrastPalette.js";
import { MixedPalette } from "./MixedPalette.js";
import { RGBWPalette } from "./RGBWPalette.js";
import { paletteStore } from "../script.js";
import { copyToClipboard } from "../utils/copyToClipboard.js";


export class PaletteSelector {
    $target
    $toolBox
    constructor(paletteViewer, toolBox) {
        this.$target = paletteViewer;
        this.$toolBox = toolBox;
        this.palettes = [ContrastPalette, MixedPalette, RGBWPalette];
        this.render(true);
        this.setup();
        this.handler();
    }
    setup() {
        paletteStore.subscribe(["currentColor", "colorType"], () => {
            this.render(false);
        })
        paletteStore.subscribe(["paletteType"], () => {
            this.render(true);
        })
        paletteStore.subscribe(["paletteType"], () => {
            const $paletteMenu = document.getElementById("paletteMenu");
            $paletteMenu.querySelectorAll("button").forEach((button, idx) => {
                button.classList.toggle("selected", idx === Number(paletteStore.state.paletteType));
            });

        })
        paletteStore.subscribe(["itemCounts"], () => {
            this.render(true);
        })
    }
    render(init) {
        const { paletteType } = paletteStore.state;
        const currentPalette = new this.palettes[paletteType](this.$target, this.$toolBox);
        currentPalette.render(init);
    }
    handler() {
        //이벤트 위임
        this.$target.addEventListener("click", (e) => {
            let button = e.target.closest("button");
            // 복사 버튼 (div.clipboardButton)
            if (button && button.classList.contains("clipboardButton")) {
                copyToClipboard(button.value);
            }

            // 교체 버튼 (div.exChangeButton)
            if (button && button.classList.contains("exChangeButton")) {
                let siblingClipboardButton = button.closest(".colorItemButtonBox").querySelector(".clipboardButton");
                paletteStore.setColor(new Color(siblingClipboardButton.value));

            }

        })

        this.$target.addEventListener("mouseover", (e) => {
            const hoverElement = e.target.closest(".colorItemBox");
            if (hoverElement) {
                hoverElement.querySelector(".colorCode").style.color = 'white';
            }
        })
        this.$target.addEventListener("mouseout", e => {
            const hoverElement = e.target.closest(".colorItemBox");
            if (hoverElement) {
                const $colorCode = hoverElement.querySelector(".colorCode");
                $colorCode.style.color = (new Color($colorCode.innerText)).getTextColor().hexColor;

            }
        })

    }

}
