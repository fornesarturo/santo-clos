var adminUser = "ramonsix";

function createEventStuff() {
    
    var data = getEventData();
    console.log(data);
    var options = {
        hostname: 'localhost',
        port: 8080,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    var fullURL = "/api/json/event";
    console.log(fullURL);
    console.log(options);
    fetch(fullURL, options)
    .then(res => res.json());

}

function comparePass(resJSON) {
    console.log(resJSON);
    resJSON = resJSON[0];
    var username = $('.validate-input input[name="username"]').val().trim();
    var password = $('.validate-input input[name="password"]').val().trim();
    let samePass = (password == resJSON.password);
    let sameUser = (username == resJSON.username);
    console.log(samePass);
    console.log(sameUser);
    if(samePass && sameUser) {
        location.href = "/createEvent";
    }
    else {
        alert("USERNAME or PASSWORD INCORRECT");
    }
}

function getEventData() {
    var eventName = $('.eventName').val().trim();
    var eventDate = $('.eventDate').val().trim();
    var eventAmount = $('.eventAmount').val().trim();
    var eventAddress = $('.eventAddress').val().trim();
    var body = {};
    body["name"] = eventName;
    body["eventDate"] = eventDate;
    body["address"] = eventAddress;
    body["amount"] = eventAmount;
    body["admin"] = adminUser;
    return body;
}

function getUserForLogin() {
    var username = $('.validate-input input[name="username"]').val().trim();
    var params = "?user=" + username;
    return params;
}