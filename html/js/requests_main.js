// Create EVENT in DB
function createEventRequest(name, date, address, amount) {
    let data = {
        name: name,
        date: date,
        address: address,
        amount: amount
    };
    let options = {
        hostname: 'localhost',
        port: 8080,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    let fullURL = "/api/json/event";

    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data.eventId) {
            console.log("Add participants");
        }
        else console.log(resJSON);
    });
}

// Get EVENTS where the user is participant
function getJoinedEventsRequest() {
    let options = {
        hostname: 'localhost',
        port: 8080,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    let fullURL = "/api/json/user/joinedEvents";

    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data) {
            console.log(resJSON);
        }
        else console.log(resJSON);
    });
}

// Get EVENTS where the user is admin
function getEventsAdminRequest() {
    let options = {
        hostname: 'localhost',
        port: 8080,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    let fullURL = "/api/json/user/events";

    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data.eventId) {
            return resJSON;
        }
        else return resJSON;
    });
}

// Check if password is valid
async function passwordValidationRequest(username, password) {
    let data = {
        username: username,
        password: sha256(password)
    };
    let options = {
        hostname: 'localhost',
        port: 8080,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    let fullURL = "/auth/authPassword";

    let response = await fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        console.log(resJSON.success);
        if(resJSON.success) {
            return resJSON.success;
        }
        else return resJSON;
    });
    return response;
}