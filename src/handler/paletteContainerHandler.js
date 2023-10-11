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


    // 팔레트 전환, 새 팔레트 버튼 이벤트
    $paletteList.addEventListener("click", (e) => {
        // 이벤트 위임
        const clickElement = e.target;
        if (clickElement === $paletteList) return;


        let $palette = clickElement.closest(".palette");
        if ($palette) {
            showPaletteTitle();
            colorPaletteList.setIndex($palette.value);


        }

        // 새 팔레트 클릭시 
        if (clickElement.closest(".newPalette")) {
            const newPalette = new ColorPalette();
            colorPaletteList.addColorPalette(newPalette);
        }

    })


    // 팔레트리스트 컨테이너 밖 클릭 시 컨테이너 display : none
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
    const $paletteTitle = document.getElementById("paletteTitle");

    // 팔레트 전환 버튼 (좌,우)
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
        showPaletteTitle();


        showPaletteTimer = setTimeout(() => {
            $paletteListContainer.style.transform = 'translateY(100%)';

        }, 1500);

        $paletteListContainer.style.transform = 'translateY(0)';


    })


    var showPaletteTimer = setTimeout(() => {
        $paletteListContainer.style.transform = 'translateY(100%)';
    }, 1500);


    $paletteListContainer.addEventListener("mousedown", (e) => {
        if (e.target.closest("button") !== $toggleButton && !isToggle) {
            isToggle = !isToggle;
        }

        clearTimeout(showPaletteTimer)
    })


    /**
     * 팔레트 타이틀 화면 중간에 표시 
     */
    function showPaletteTitle() {
        $paletteTitle.innerText = colorPaletteList.getCurrentPalette().title;

        $paletteTitle.style.left = `calc(50vw - ${$paletteTitle.clientWidth / 2}px)`;
        $paletteTitle.style.top = `calc(50vh - ${$paletteTitle.clientHeight / 2}px)`;
        $paletteTitle.style.zIndex = 1;
        $paletteTitle.style.opacity = 1;
    }
    // 자동으로 팔레트 타이틀 지워주는 이벤트
    $paletteTitle.addEventListener("transitionend", (e) => {

        $paletteTitle.style.opacity = 0;
        if (e.propertyName === "opacity" && getComputedStyle($paletteTitle).opacity === 0) {
            $paletteTitle.style.zIndex = -3;

        }
    })




    const $titleInput = document.getElementById("newPaletteTitleInput");
    const $newPaletteAddButton = document.getElementById("newPaletteAddButton");
    const $newPaletteContainer = document.getElementById("newPaletteContainer");
    $paletteListContainer.addEventListener("click", (e) => {
        const clickElement = e.target;


        if (clickElement.closest(".newPalette")) {

            $newPaletteContainer.style.display = "flex";
            $titleInput.focus();

        }


    })

    // 새 팔레트 이름 지정 input 관련
    $titleInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            $newPaletteAddButton.click();
            $titleInput.value = ""
        }
        if (e.key === "Escape") {
            $newPaletteContainer.style.display = "none";
            colorPaletteList.dropCurrentPalette();
        }
    })


    $newPaletteAddButton.addEventListener("click", (e) => {
        colorPaletteList.getCurrentPalette().title = $titleInput.value || "새 팔레트";
        $newPaletteContainer.style.display = "none";

    })




    // 팔레트 hover 효과 (삭제 버튼 view)
    $paletteListContainer.addEventListener("mouseover", (e) => {
        const hoverElement = e.target.closest(".palette");
        // 팔레트 hover 시
        if (hoverElement && colorPaletteList.getPaletteLength() > 1) {
            hoverElement.querySelector("button").style.display = "block";
        }
    })
    $paletteListContainer.addEventListener("mouseout", (e) => {
        const hoverOutElement = e.target.closest(".palette");
        // 팔레트 hover 시
        if (hoverOutElement) {
            hoverOutElement.querySelector("button").style.display = "none";
        }
    })
    $paletteListContainer.addEventListener("click", (e) => {
        const clickButton = e.target.closest(".dropButton");


        if (clickButton) {
            const closestPalette = clickButton.closest(".palette")

            colorPaletteList.dropPalette(closestPalette.dataset.index);
        }

    })



}



