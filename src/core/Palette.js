import { Color } from "../constructor/Color.js";
import { customCreateElement } from "../utils/customCreateElement.js";
import { renderInitialElements } from "../views/renderInitialElements.js";

export class Palette {
    $target;
    $toolBox;
    constructor(paletteViewerElement, toolBox) {
        this.$target = paletteViewerElement;
        this.$toolBox = toolBox;
        this.itemCounts = 25;
        this.init = true;
    }
    prevRender() {
        console.log("prev");
        const $colorPalette = document.getElementById("colorPalette");

        // 임시 코드
        $colorPalette.innerHTML = "";
        //

        const colorItemList = customCreateElement("div.colorItemList");


        $colorPalette.appendChild(colorItemList);

        (new Array(this.itemCounts).fill(0)).forEach(() => {
            const colorItemBox = customCreateElement("div.colorItemBox.flex-center");


            const colorCode = customCreateElement("p.colorCode");


            const colorItemButtonBox = customCreateElement("div.colorItemButtonBox");

            const exChangeButton = customCreateElement("button.exChangeButton.button-svg")

            // 교체 아이콘
            exChangeButton.innerHTML = `<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m2.179 10.201c.055-.298.393-.734.934-.59.377.102.612.476.543.86-.077.529-.141.853-.141 1.529 0 4.47 3.601 8.495 8.502 8.495 2.173 0 4.241-.84 5.792-2.284l-1.251-.341c-.399-.107-.636-.519-.53-.919.108-.4.52-.637.919-.53l3.225.864c.399.108.637.519.53.919l-.875 3.241c-.107.399-.519.636-.919.53-.399-.107-.638-.518-.53-.918l.477-1.77c-1.829 1.711-4.27 2.708-6.838 2.708-5.849 0-9.968-4.8-10.002-9.93-.003-.473.027-1.119.164-1.864zm19.672 3.6c-.054.298-.392.734-.933.59-.378-.102-.614-.476-.543-.86.068-.48.139-.848.139-1.53 0-4.479-3.609-8.495-8.5-8.495-2.173 0-4.241.841-5.794 2.285l1.251.341c.4.107.638.518.531.918-.108.4-.519.637-.919.53l-3.225-.864c-.4-.107-.637-.518-.53-.918l.875-3.241c.107-.4.518-.638.918-.531.4.108.638.518.531.919l-.478 1.769c1.83-1.711 4.272-2.708 6.839-2.708 5.865 0 10.002 4.83 10.002 9.995 0 .724-.081 1.356-.164 1.8z"
                fill-rule="nonzero" />
            </svg>`
            const clipboardButton = customCreateElement("button.clipboardButton.button-svg")
            clipboardButton.innerHTML = `<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
            stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z"
                fill-rule="nonzero" />
            </svg>`

            const overlay = customCreateElement("div.overlay-colorItemBox");


            colorItemButtonBox.appendChild(exChangeButton);
            colorItemButtonBox.appendChild(clipboardButton);

            colorItemList.appendChild(colorItemBox);

            colorItemBox.appendChild(colorCode);

            colorItemBox.appendChild(colorItemButtonBox);

            colorItemBox.appendChild(overlay);

        })
        this.renderToolBox();
    }
    renderToolBox() {
        this.$toolBox.innerHTML = ``;
        let colorType = customCreateElement("div#colorType.poppins-bold");
        colorType.innerText = "RGB";
        this.$toolBox.appendChild(colorType);

    }
    render(colorState, init) {
        if (init) {
            this.init = true;
        }
        if (this.init) {
            this.prevRender();
            this.init = false;
        }
        // 렌더링
        this.repaint(colorState);
    }

    repaint(color) {
        // 색상 CSS 변수 수정
        document.documentElement.style.setProperty("--current-color", color.hexColor);
        document.documentElement.style.setProperty("--element-color", color.getTextColor().hexColor);

    }

    // 배경, 텍스트 색상, 클립보드 값
    repaintColorItem(item, color = new Color("#FFFFFF"), colorType) {
        item.style.backgroundColor = color.hexColor;
        const colorCode = item.querySelector(".colorCode");
        colorCode.innerText = color.getColorByType(colorType);

        colorCode.style.color = color.getTextColor().hexColor;;

        const clipboardButton = item.querySelector(".clipboardButton");
        clipboardButton.value = color.getColorByType(colorType);
    }

}