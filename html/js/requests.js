
function requestGet() {
    var requestType = $("#requestType")[0].checked;
    var requestContent = $("#userTxt")[0].value;
    if(requestType) {
        getJSON(requestContent);
    }
    else {
        getXML(requestContent);
    }
}

function getJSON(requestContent) {
    console.log("JSON: " + requestContent);

    var options = {
        hostname: 'localhost',
        port: 8080,
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        method: 'GET'
    };
    var url = "/api/json/user";
    var params = "?name=" + requestContent;
    fetch(url + params, options)
    .then(res => res.json())
    .then(resJSON => receiveJSON(resJSON[0]));
}

function getXML(requestContent) {
    console.log("XML: " + requestContent);

    var options = {
        hostname: 'localhost',
        port: 8080,
        headers: new Headers({
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        }),
        method: 'GET'
    };
    var url = "/api/xml/user";
    var params = "?name=" + requestContent;
    fetch(url + params, options)
    .then(res => res.text())
    .then(resXML => receiveXML(resXML));
}

function receiveJSON(jsonData) {
    console.log(jsonData);
    $("#response").html(JSON.stringify(jsonData));

}

function receiveXML(xmlData) {
    console.log(xmlData);

    xmlData= $(xmlData); 
    if (window.ActiveXObject){ 
        var xmlString = xmlData.xml; 
    } else {
        var oSerializer = new XMLSerializer(); 
        var xmlString = oSerializer.serializeToString(xmlData[0]);
    } 
    console.log(xmlString);

    $("#response").html((new XMLSerializer()).serializeToString(xmlString));
}