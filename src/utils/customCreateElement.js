/**
 * #,. 태그를 이용해서 새로운 엘리먼트 생성 
 * @param {*} elementSting  (div.class, div#id, div#id.class)
 * @returns 
 */
export function customCreateElement(elementSting) {
    let tagName = "";
    let className = "";
    let id = "";

    if (elementSting.includes(".") && elementSting.includes("#")) {
        const splitArr = elementSting.split("#");

        if (splitArr[0].includes(".")) {
            [tagName, className] = splitArr[0].split(".");
            id = splitArr[1];

        }
        else {
            tagName = splitArr[0];
            [id, className] = splitArr[1].split(".");
        }
    }
    else if (elementSting.includes(".")) {
        [tagName, className] = elementSting.split(".");
    }
    else if (elementSting.includes("#")) {
        [tagName, id] = elementSting.split("#");
    }
    else {
        tagName = elementSting;
    }

    const element = document.createElement(tagName);
    element.id = id;
    element.className = className;


    return element;

}