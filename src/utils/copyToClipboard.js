
function copyToClipboard(value) {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);

    textArea.select();
    textArea.setSelectionRange(0, 9999);
    try {
        document.execCommand("copy");
        alert("복사되었습니다.");
    }
    catch {
        alert("클립보드 복사에 실패했습니다.");
    }
    textArea.setSelectionRange(0, 0);
    document.body.removeChild(textArea);
}

export { copyToClipboard }