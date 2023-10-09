const $canvas = document.getElementById("canvas");

const $fileSelector = document.getElementById("fileSelector");
const ctx = $canvas.getContext('2d');
const $image = document.getElementById("image");

$fileSelector.addEventListener("change", handleImageUpload)


function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                $canvas.width = img.width;
                $canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                getColorAtPixel(100, 100); // 원하는 좌표에 대한 색상 추출
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}