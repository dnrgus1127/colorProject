import { customCreateElement } from "../customCreateElement.js";


export default function createCustomSlider({ max = 100, min = 0, initValue = 0 }) {
    const $inputWrapper = customCreateElement("div.custom-slider")
    const $line = customCreateElement("div.slider-line");
    const $sliderIcon = customCreateElement("div.slider-icon");
    const $lineFill = customCreateElement("div.slider-line-fill")
    const $input = customCreateElement("input.sldier-range");
    $input.type = "range";
    $input.min = min;
    $input.max = max;
    $input.value = initValue;


    $inputWrapper.appendChild($sliderIcon);
    $line.appendChild($lineFill);
    $inputWrapper.appendChild($line);
    $inputWrapper.appendChild($input);

    function rangeHandler() {
        $lineFill.style.width = `${$input.value / max * 100}%`
        $sliderIcon.innerText = $input.value;
        $sliderIcon.style.left = `calc(calc(calc(100% - 16px) * ${$input.value / max}) - 4px)`
    }
    rangeHandler();

    $input.addEventListener("input", rangeHandler)

    return $inputWrapper;
}