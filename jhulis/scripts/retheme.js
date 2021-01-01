function retheme() {
    var cc = document.body.className;
    if (cc.indexOf("darktheme") > -1) {
        document.body.className = cc.replace("darktheme", "");
        if (opener) { opener.document.body.className = cc.replace("darktheme", ""); }
        localStorage.setItem("theme", "light");
    } else {
        document.body.className += " darktheme";
        if (opener) { opener.document.body.className += " darktheme"; }
        localStorage.setItem("theme", "dark");
    }
}

//Ao carregar a página, define o tema já gravado previamente.
if (localStorage.getItem("theme") == "dark") retheme();