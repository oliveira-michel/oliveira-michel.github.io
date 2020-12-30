#dragbar {
    position: absolute;
    cursor: col-resize;
    z-index: 3;
    padding: 5px;
}

#shield {
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    height: 100%;
    z-index: 4;
}

#container {
    background-color: #f1f1f1;
    width: 100%;
    overflow: auto;
    position: absolute;
    top: 40px;
    bottom: 0;
    height: auto;
}

#textareacontainer,
#iframecontainer {
    float: left;
    height: 100%;
    width: 50%;
}

#iframeContainer {
    border: 1px solid red;
}

#textarea,
#iframe {
    height: 100%;
    width: 100%;
    padding-bottom: 10px;
    padding-top: 1px;
}

#textarea {
    padding-left: 10px;
    padding-right: 5px;
}

#iframe {
    padding-left: 5px;
    padding-right: 10px;
}

#textareawrapper {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

#iframewrapper {
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

#textareaCode {
    background-color: #ffffff;
    font-family: consolas, "courier new", monospace;
    font-size: 15px;
    height: 100%;
    width: 100%;
    padding: 8px;
    resize: none;
    border: none;
    line-height: normal;
}