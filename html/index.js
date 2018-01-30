
function requestGet() {
    var requestType = document.getElementById("requestType").checked;
    var requestContent = document.getElementById("userTxt").value;
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
    .then(resJSON => reset(resJSON));
}

function getXML(requestContent) {
    console.log("XML: " + requestContent);
}

function send(event, ele) {
    if(event.key === 'Enter') {
        requestGet();        
    }
};