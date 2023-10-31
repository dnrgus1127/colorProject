import { paletteStore } from "../script";

export function windowHandler() {
    let type = 1024;
    function reRenderItemCounts(target) {
        if (target.innerWidth >= 1024 && type !== 1024) {
            paletteStore.setState({ key: "itemCounts", value: 25 });
            type = 1024;
        }
        if (target.innerWidth < 1024 && type !== 768) {
            paletteStore.setState({ key: "itemCounts", value: 16 });
            type = 768;
        }
        if (target.innerWidth <= 768 && type !== 480) {
            paletteStore.setState({ key: "itemCounts", value: 15 });
            type = 480;
        }
    }
    reRenderItemCounts(window);
    window.addEventListener("resize", e => {
        reRenderItemCounts(e.target);
    })
}