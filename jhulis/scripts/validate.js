function submitValidate() {

    showLoading();
    var text = editor.getValue();
    var httpClient = new XMLHttpRequest();
    httpClient.open("POST", "https://api-jhulis.azurewebsites.net/jhulis/v0/validate", true);
    httpClient.setRequestHeader("Accept", "application/json");
    httpClient.setRequestHeader("Content-Type", "text/plain");

    httpClient.onreadystatechange = function() {
         if(httpClient.readyState == 4 /*&& httpClient.status == 200*/) {
            formatValidationResult(httpClient.responseText);
         } else {
            showLoading();
         }
    }

    httpClient.send(text);   
}

function showLoading() {
    document.getElementById("iframewrapper").innerHTML = "";
    
        var loadImage = document.createElement("img");
            loadImage.setAttribute("src", "images/loading-block-dots.gif");
            loadImage.setAttribute("style", "height: 6px;");
    
    document.getElementById("iframewrapper").appendChild(loadImage);
}

function formatValidationResult(result) {

    var obj = JSON.parse(result);

    document.getElementById("iframewrapper").innerHTML = "";

    //GENERAL RESULT CONTAINER
    var resultContainer = document.createElement("div");
        resultContainer.setAttribute("class", "w3-container  w3-padding-16");

        var today = document.createElement("span");
            today.appendChild(document.createTextNode(new Date().toLocaleString("pt-BR")));
            today.setAttribute("class", "w3-tiny w3-left-align");


        var resultLabel = document.createElement("span");
            resultLabel.appendChild(document.createTextNode("Resultado geral: "));
        
        var result = document.createElement("span")
        
            switch (obj.result) {
                case 'Error':
                    result.setAttribute("class", "w3-tag w3-round w3-metro-red w3-center w3-small");
                    break;
                case 'PassedWithWarnings':
                    result.setAttribute("class", "w3-tag w3-round w3-metro-orange w3-right w3-small");
                    break;
                case 'PassedWithInformations':
                    result.setAttribute("class", "w3-tag w3-round w3-metro-blue w3-right w3-small");
                    break;
                case 'Passed':
                    result.setAttribute("class", "w3-tag w3-round w3-metro-light-green w3-right w3-small");
                    break;
            }

            result.appendChild(document.createTextNode(obj.result));

        resultContainer.appendChild(resultLabel);
        resultContainer.appendChild(document.createTextNode(" "));
        resultContainer.appendChild(result);
        resultContainer.appendChild(document.createElement("br"));
        resultContainer.appendChild(today);

    document.getElementById("iframewrapper").appendChild(resultContainer);

    //RULES    
    for(var i=0; i < obj.resultItens.length; i++)
    {
        var ruleHeader = document.createElement("div");
            ruleHeader.setAttribute("onclick", "myFunction('Demo"+i+"')");
            ruleHeader.setAttribute("class", "w3-btn w3-block w3-left-align");
            ruleHeader.appendChild(document.createTextNode(obj.resultItens[i].rule));

            var severity = document.createElement("span")
                switch (obj.resultItens[i].severity) {
                    case 'Hint':
                        severity.setAttribute("class", "w3-tag w3-round w3-metro-light-green w3-right w3-tiny");
                        break;
                    case 'Information':
                        severity.setAttribute("class", "w3-tag w3-round w3-metro-blue w3-right w3-tiny");
                        break;
                    case 'Warning':
                        severity.setAttribute("class", "w3-tag w3-round w3-metro-orange w3-right w3-tiny");
                        break;
                    case 'Error':
                        severity.setAttribute("class", "w3-tag w3-round w3-metro-red w3-right w3-tiny");
                        break;
                }
            var severityText = document.createTextNode(obj.resultItens[i].severity);
                severity.appendChild(severityText);

        ruleHeader.appendChild(severity);
        
    if (obj.resultItens[i].value){
    
            var value = document.createElement("span")
                value.appendChild(document.createTextNode(obj.resultItens[i].value));
                value.setAttribute("class", "w3-tiny w3-left-align");
    
        ruleHeader.appendChild(document.createElement("br"));
        ruleHeader.appendChild(value);
    }

        var ruleContent = document.createElement("div");
            ruleContent.setAttribute("id","Demo"+i);

        if (obj.resultItens[i].rule == "GenericError")
            ruleContent.setAttribute("class","w3-container w3-padding-16");
        else
            ruleContent.setAttribute("class","w3-container w3-hide w3-padding-16");
            

            var description = document.createElement("div");
                description.setAttribute("class","w3-small w3-margin-left");
                description.appendChild(document.createTextNode(obj.resultItens[i].description));

        ruleContent.appendChild(description);
        ruleContent.appendChild(document.createElement("br"));

            var message = document.createElement("div");
                message.setAttribute("class","w3-tiny w3-margin-left");
                message.appendChild(document.createTextNode(obj.resultItens[i].message));
       
        ruleContent.appendChild(message);
5
        document.getElementById("iframewrapper").appendChild(ruleHeader);
        document.getElementById("iframewrapper").appendChild(ruleContent);
    }
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }