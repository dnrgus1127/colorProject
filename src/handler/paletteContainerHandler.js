export function addPaletteContainerHandler(colorPaletteList) {
    const $toggleButton = document.getElementById("paletteListToggleButton");
    const $paletteListContainer = document.getElementById("paletteListConatiner")
    const $paletteList = document.getElementById("paletteList");

    let isToggle = false;



    // 핸들러로 전달된 화살표 함수가 클로저로서 동작
    $toggleButton.addEventListener("click", () => {

        if (isToggle) {
            $paletteListContainer.style.transform = `translateY(-100%)`;
        }
        else {
            colorPaletteList.refreshPaletteList();
            $paletteListContainer.style.transform = `translateY(0)`;
        }
        isToggle = !isToggle
    });


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




}

