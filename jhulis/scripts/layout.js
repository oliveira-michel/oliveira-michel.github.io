if (window.addEventListener) {
    window.addEventListener("resize", browserResize);
} else if (window.attachEvent) {
    window.attachEvent("onresize", browserResize);
}
var xbeforeResize = window.innerWidth;

function browserResize() {
    var afterResize = window.innerWidth;
    if ((xbeforeResize < (970) && afterResize >= (970)) || (xbeforeResize >= (970) && afterResize < (970)) ||
        (xbeforeResize < (728) && afterResize >= (728)) || (xbeforeResize >= (728) && afterResize < (728)) ||
        (xbeforeResize < (468) && afterResize >= (468)) || (xbeforeResize >= (468) && afterResize < (468))) {
        xbeforeResize = afterResize;
    }
    if (window.screen.availWidth <= 768) {
        restack(window.innerHeight > window.innerWidth);
    }
    fixDragBtn();
}

var currentStack = true;
if ((window.screen.availWidth <= 768 && window.innerHeight > window.innerWidth)) { restack(true); }
function restack(horizontal) {
    var tc, ic, t, i, c, f, sv, sh, d, height, flt, width;
    tc = document.getElementById("textareacontainer");
    ic = document.getElementById("iframecontainer");
    t = document.getElementById("textarea");
    i = document.getElementById("iframe");
    c = document.getElementById("container");
    sv = document.getElementById("stackV");
    sh = document.getElementById("stackH");
    tc.className = tc.className.replace("horizontal", "");
    ic.className = ic.className.replace("horizontal", "");
    t.className = t.className.replace("horizontal", "");
    i.className = i.className.replace("horizontal", "");
    c.className = c.className.replace("horizontal", "");
    if (sv) { sv.className = sv.className.replace("horizontal", "") };
    if (sv) { sh.className = sh.className.replace("horizontal", "") };
    stack = "";
    if (horizontal) {
        tc.className = tc.className + " horizontal";
        ic.className = ic.className + " horizontal";
        t.className = t.className + " horizontal";
        i.className = i.className + " horizontal";
        c.className = c.className + " horizontal";
        if (sv) { sv.className = sv.className + " horizontal" };
        if (sv) { sh.className = sh.className + " horizontal" };
        stack = " horizontal";
        document.getElementById("textareacontainer").style.height = "50%";
        document.getElementById("iframecontainer").style.height = "50%";
        document.getElementById("textareacontainer").style.width = "100%";
        document.getElementById("iframecontainer").style.width = "100%";
        currentStack = false;
        localStorage.setItem("orientation", "horizontal");
    } else {
        document.getElementById("textareacontainer").style.height = "100%";
        document.getElementById("iframecontainer").style.height = "100%";
        document.getElementById("textareacontainer").style.width = "50%";
        document.getElementById("iframecontainer").style.width = "50%";
        currentStack = true;
        localStorage.setItem("orientation", "vertical");
    }
    fixDragBtn();
}
var dragging = false;
var stack;
function fixDragBtn() {
    var textareawidth, leftpadding, dragleft, containertop, buttonwidth
    var containertop = Number(w3_getStyleValue(document.getElementById("container"), "top").replace("px", ""));
    if (stack != " horizontal") {
        document.getElementById("dragbar").style.width = "5px";
        textareasize = Number(w3_getStyleValue(document.getElementById("textareawrapper"), "width").replace("px", ""));
        leftpadding = Number(w3_getStyleValue(document.getElementById("textarea"), "padding-left").replace("px", ""));
        buttonwidth = Number(w3_getStyleValue(document.getElementById("dragbar"), "width").replace("px", ""));
        textareaheight = w3_getStyleValue(document.getElementById("textareawrapper"), "height");
        dragleft = textareasize + leftpadding + (leftpadding / 2) - (buttonwidth / 2);
        document.getElementById("dragbar").style.top = containertop + "px";
        document.getElementById("dragbar").style.left = dragleft + "px";
        document.getElementById("dragbar").style.height = textareaheight;
        document.getElementById("dragbar").style.cursor = "col-resize";

    } else {
        document.getElementById("dragbar").style.height = "5px";
        if (window.getComputedStyle) {
            textareawidth = window.getComputedStyle(document.getElementById("textareawrapper"), null).getPropertyValue("height");
            textareaheight = window.getComputedStyle(document.getElementById("textareawrapper"), null).getPropertyValue("width");
            leftpadding = window.getComputedStyle(document.getElementById("textarea"), null).getPropertyValue("padding-top");
            buttonwidth = window.getComputedStyle(document.getElementById("dragbar"), null).getPropertyValue("height");
        } else {
            dragleft = document.getElementById("textareawrapper").currentStyle["width"];
        }
        textareawidth = Number(textareawidth.replace("px", ""));
        leftpadding = Number(leftpadding.replace("px", ""));
        buttonwidth = Number(buttonwidth.replace("px", ""));
        dragleft = containertop + textareawidth + leftpadding + (leftpadding / 2);
        document.getElementById("dragbar").style.top = dragleft + "px";
        document.getElementById("dragbar").style.left = "5px";
        document.getElementById("dragbar").style.width = textareaheight;
        document.getElementById("dragbar").style.cursor = "row-resize";
    }
}
function dragstart(e) {
    e.preventDefault();
    dragging = true;
    var main = document.getElementById("iframecontainer");
}
function dragmove(e) {
    if (dragging) {
        document.getElementById("shield").style.display = "block";
        if (stack != " horizontal") {
            var percentage = (e.pageX / window.innerWidth) * 100;
            if (percentage > 5 && percentage < 98) {
                var mainPercentage = 100 - percentage;
                document.getElementById("textareacontainer").style.width = percentage + "%";
                document.getElementById("iframecontainer").style.width = mainPercentage + "%";
                fixDragBtn();
            }
        } else {
            var containertop = Number(w3_getStyleValue(document.getElementById("container"), "top").replace("px", ""));
            var percentage = ((e.pageY - containertop + 20) / (window.innerHeight - containertop + 20)) * 100;
            if (percentage > 5 && percentage < 98) {
                var mainPercentage = 100 - percentage;
                document.getElementById("textareacontainer").style.height = percentage + "%";
                document.getElementById("iframecontainer").style.height = mainPercentage + "%";
                fixDragBtn();
            }
        }
    }
}
function dragend() {
    document.getElementById("shield").style.display = "none";
    dragging = false;
    var vend = navigator.vendor;
    if (window.editor && vend.indexOf("Apple") == -1) {
        window.editor.refresh();
    }
}
if (window.addEventListener) {
    document.getElementById("dragbar").addEventListener("mousedown", function (e) { dragstart(e); });
    document.getElementById("dragbar").addEventListener("touchstart", function (e) { dragstart(e); });
    window.addEventListener("mousemove", function (e) { dragmove(e); });
    window.addEventListener("touchmove", function (e) { dragmove(e); });
    window.addEventListener("mouseup", dragend);
    window.addEventListener("touchend", dragend);
    window.addEventListener("load", fixDragBtn);
}

function w3_getStyleValue(elmnt, style) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elmnt, null).getPropertyValue(style);
    } else {
        return elmnt.currentStyle[style];
    }
}

//Ao carregar a página, define a orientação já gravada previamente.
if (localStorage.getItem("orientation") == "horizontal") restack(true);