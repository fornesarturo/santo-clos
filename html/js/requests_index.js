// Create USER in DB
function createUser(name, email, username, password) {
    let data = {
        username: username,
        password: sha256(password),
        name: name,
        email: email
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
    let fullURL = "/api/json/user";

    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.access_token && resJSON.type == "Bearer") {
            loadMain();
        }
        else console.log(resJSON);
    });
}

// Login USER
function loginUser(username, password) {
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
    let fullURL = "/auth/token";

    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.access_token && resJSON.type == "Bearer") {
            loadMain();
        }
        else console.log(resJSON);
    });
}

function loadMain() {
    location.href = "/main";
}