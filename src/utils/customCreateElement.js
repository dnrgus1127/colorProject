/**
 * #,. 태그를 이용하여 요소 생성 
 * @param {string} elementSting  (div.class, div#id, div#id.class div#id.class.class2)
 * @returns 만들어진 DOM 요소 반환
 */
export function customCreateElement(elementSting) {
    let tagName = "";
    let className = "";
    let classList = [];
    let id = "";

    if (elementSting.includes(".") && elementSting.includes("#")) {
        const splitArr = elementSting.split("#");

        if (splitArr[0].includes(".")) {
            [tagName, ...classList] = splitArr[0].split(".");
            id = splitArr[1];

        }
        else {
            tagName = splitArr[0];
            [id, ...classList] = splitArr[1].split(".");
        }
    }
    else if (elementSting.includes(".")) {
        [tagName, ...classList] = elementSting.split(".");
    }
    else if (elementSting.includes("#")) {
        [tagName, id] = elementSting.split("#");
    }
    else {
        tagName = elementSting;
    }

    const element = document.createElement(tagName);
    if (id) {
        element.id = id;
    }
    classList.forEach(item => {
        element.classList.add(item);
    })

    return element;

}