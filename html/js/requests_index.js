
// HTML requests

function createGuestEventHTML() {
    location.href = "/createEvent";
}

function createLoginEventHTML() {

    var username = $('.validate-input input[name="username"]').val().trim();
    var params = "user=" + username;
    var url = "/user?";

    var options = {
        hostname: 'localhost',
        port: 8080,
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        method: 'GET'
    };
    var fullURL = "/api/json/user" + getUserForLogin();
    console.log(fullURL);
    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => comparePass(resJSON));

}

function createRegisterEventHTML() {
    
    var data = getCreateUserData();
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
    var fullURL = "/api/json/user";
    console.log(fullURL);
    console.log(options);
    fetch(fullURL, options)
    .then(res => res.json())
    .then((res) => location.href = "/createEvent");

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

function getCreateUserData() {
    var name = $('.validate-input input[name="name"]').val().trim();
    var username = $('.validate-input input[name="username"]').val().trim();
    var password = $('.validate-input input[name="password"]').val().trim();
    var email = $('.validate-input input[name="email"]').val().trim();
    var body = {};
    body["name"] = name;
    body["username"] = username;
    body["password"] = password;
    body["email"] = email;
    return body;
}

function getUserForLogin() {
    var username = $('.validate-input input[name="username"]').val().trim();
    var params = "?user=" + username;
    return params;
}

// function request() {
//     var requestType = $("#requestType").is(":checked"); // true -> xml
//     if(!requestType) {
//         getJSON("/api/json");
//     }
//     else {
//         getXML("/api/xml");
//     }
// }

// function getParams() {
//     var params = "";
//     var url = "";
//     if($("#radio2").is(":checked")) {
//         var username = $('.validate-input input[name="username"]').val().trim();
//         params = "user=" + username;
//         url = "/user?";
//     }
//     else if($("#radio3").is(":checked")) {
//         var eventId = $('.validate-input input[name="eventId"]').val().trim();
//         params = "id=" + eventId;
//         url = "/event/users?";
//     }
//     else if($("#radio4").is(":checked")) {
//         var username = $('.validate-input input[name="username"]').val().trim();
//         var eventId = $('.validate-input input[name="eventId"]').val().trim();
//         params = "user=" + username + "&id=" + eventId;
//         url = "/event/wishlist?";
//     }
//     else if($("#radio5").is(":checked")) {
//         var username = $('.validate-input input[name="username"]').val().trim();
//         var eventId = $('.validate-input input[name="eventId"]').val().trim();
//         params = "user=" + username + "&id=" + eventId;
//         url = "/event/giftee?";
//     }
//     return url + params;
// }

// function getJSON(preURL) {
//     if($("#radio1").is(":checked")) {
//         var data = getBody();
//         console.log(data);
//         var options = {
//             hostname: 'localhost',
//             port: 8080,
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             body: JSON.stringify(getBody())
//         };
//         var fullURL = preURL + "/user";
//         console.log(fullURL);
//         console.log(options);
//         fetch(fullURL, options)
//         .then(res => res.json())
//         .then(resJSON => receiveJSON(resJSON));
//     }
//     else {
//         var options = {
//             hostname: 'localhost',
//             port: 8080,
//             headers: new Headers({
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }),
//             method: 'GET'
//         };
//         var fullURL = preURL + getParams();
//         console.log(fullURL);
//         fetch(fullURL, options)
//         .then(res => res.json())
//         .then(resJSON => receiveJSON(resJSON));
//     }
// }

// function getXML(preURL) {
//     if($("#radio1").is(":checked")) {
//         var options = {
//             hostname: 'localhost',
//             port: 8080,
//             headers: {
//                 'Accept': 'text/xml',
//                 'Content-Type': 'text/xml'
//             },
//             method: 'POST',
//             body: JSON.stringify(getBody())
//         };
//         var fullURL = preURL + "/user";
//         console.log(fullURL);
//         fetch(fullURL, options)
//         .then(res => res.text())
//         .then(resXML => receiveXML(resXML));
//     }
//     else {
//         var options = {
//             hostname: 'localhost',
//             port: 8080,
//             headers: new Headers({
//                 'Accept': 'text/xml',
//                 'Content-Type': 'text/xml'
//             }),
//             method: 'GET'
//         };
//         var fullURL = preURL + getParams();
//         console.log(fullURL);
//         fetch(fullURL, options)
//         .then(res => receiveXML(res))
//     }
// }

// function receiveJSON(jsonData) {
//     console.log(jsonData);
//     jsonString = JSON.stringify(jsonData);
//     console.log(jsonString);
//     $("#responseArea").val(jsonString);
// }

// function receiveXML(xmlData) {
//     console.log(xmlData);
//     xmlData.text().then(function(res) {
//         var xmlString = res;
//         console.log(xmlString);
//         $("#responseArea").val(xmlString);
//     });
// }

var adminUser = "c";

function createEvent() {
    
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

function getEventData() {
    var eventName = $('.validate-input input[name="eventName"]').val().trim();
    var eventDate = $('.validate-input input[name="eventDate"]').val().trim();
    var eventAmount = $('.validate-input input[name="eventAmount"]').val().trim();
    var eventAddress = $('.validate-input input[name="eventAddress"]').val().trim();
    var body = {};
    body["name"] = eventName;
    body["eventDate"] = eventDate;
    body["address"] = eventAddress;
    body["amount"] = eventAmount;
    body["admin"] = adminUser;
    return body;
}