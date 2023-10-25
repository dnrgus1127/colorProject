
// Safari 브라우저에서만 스타일을 적용할 요소를 선택합니다.
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf("Chrome") === -1 && navigator.userAgent.indexOf("Edge") === -1) {
    const $colorPickerIcon = document.getElementById("colorPickerIcon");
    $colorPickerIcon.style.opacity = 0;

    document.getElementById("colorPicker").style.visibility = "visible";

}

