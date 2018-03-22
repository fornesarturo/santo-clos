// Create EVENT in DB
async function createEventRequest(name, date, address, amount) {
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
    let fullURL = "/api/event";

    let response = await fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data.eventId) {
            console.log("Add participants");
        }
        else console.log(resJSON);
    });
    return response;
}

// Get EVENTS where the user is participant
async function getJoinedEventsRequest() {
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
    let fullURL = "/api/user/joinedEvents";

    let response = await fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data) {
            console.log(resJSON);
        }
        else console.log(resJSON);
    });
    return response;
}

// Get EVENTS where the user is admin
async function getEventsAdminRequest() {
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
    let fullURL = "/api/user/events";

    let response = await fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data.eventId) {
            return resJSON;
        }
        else return resJSON;
    });
    return response;
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

// Update user data using PUT
async function updateDataRequest(data) {
    let options = {
        hostname: 'localhost',
        port: 8080,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    };
    let fullURL = "/auth/authPassword";

    let response = await fetch(fullURL, options)
    .then(res => res.json());
    return response;
}