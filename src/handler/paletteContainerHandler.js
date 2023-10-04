import { ColorPalette } from "../constructor/ColorPalette.js";
import { colorPaletteList } from "../script.js";

export function addPaletteContainerHandler() {
    const $toggleButton = document.getElementById("paletteListToggleButton");
    const $paletteListContainer = document.getElementById("paletteListConatiner")
    const $paletteList = document.getElementById("paletteList");

    let isToggle = false;



    // 핸들러로 전달된 화살표 함수가 클로저로서 동작
    $toggleButton.addEventListener("click", () => {

        if (isToggle) {
            $paletteListContainer.style.transform = `translateY(100%)`;
        }
        else {
            colorPaletteList.refreshPaletteList();
            $paletteListContainer.style.transform = `translateY(0)`;
        }
        isToggle = !isToggle
    });


    $paletteList.addEventListener("click", (e) => {
        // 이벤트 위임
        const clickElement = e.target;
        if (clickElement === $paletteList) return;


        let $palette = clickElement.closest(".palette");
        if ($palette) {
            colorPaletteList.setIndex($palette.value);

        }

        // 새 팔레트 클릭시 
        if (clickElement.closest(".newPalette")) {
            const newPalette = new ColorPalette();
            colorPaletteList.addColorPalette(newPalette);
        }

    })


    // 팔레트 리스트 컨테이너 밖 클릭 시 컨테이너 닫음
    document.addEventListener("mousedown", (e) => {
        if (e.target !== $paletteListContainer && !$paletteListContainer.contains(e.target) && isToggle) {

            const clickEvent = new Event("click", {
                bubbles: true,
                cancelable: true,
            })
            $toggleButton.dispatchEvent(clickEvent);
        }
    })


    const $paletteListButtons = document.getElementById("paletteListButtons");





    const $paletteTitle = document.getElementById("paletteTitle")
    $paletteListButtons.addEventListener("click", (e) => {
        let clickElement = e.target.closest(".paletteIndexButton");

        if (!clickElement) return;

        clearTimeout(showPaletteTimer);

        if (clickElement.id === "prevPaletteButton") {
            colorPaletteList.prevIndex();
        }
        if (clickElement.id === "nextPaletteButton") {
            colorPaletteList.nextIndex();
        }
        $paletteTitle.innerText = colorPaletteList.getCurrentPalette().title;
        $paletteTitle.style.visibility = "visible";


        showPaletteTimer = setTimeout(() => {
            $paletteListContainer.style.transform = 'translateY(100%)';

        }, 1500);

        $paletteListContainer.style.transform = 'translateY(0)';


    })

    $paletteTitle.addEventListener("transitionend", (e) => {
        $paletteTitle.style.visibility = "hidden";
    })



    var showPaletteTimer = setTimeout(() => {
        $paletteListContainer.style.transform = 'translateY(100%)';
    }, 1500);
}



