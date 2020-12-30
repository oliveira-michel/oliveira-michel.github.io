function hasJsonStructure(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]'
            || type === '[object Array]';
    } catch (err) {
        return false;
    }
}

function colorcoding() {
    var ua = navigator.userAgent;
    //Opera Mini refreshes the page when trying to edit the textarea.
    if (ua && ua.toUpperCase().indexOf("OPERA MINI") > -1) { return false; }
    window.editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
        mode: "application/json",
        lineWrapping: true,
        smartIndent: true,
        addModeClass: true,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        autofocus: true
    });
}
colorcoding();