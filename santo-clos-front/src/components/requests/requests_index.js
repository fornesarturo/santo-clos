/* eslint-disable */
import axios from 'axios'
const $ = require('jquery')
window.jQuery = $
window.Popper = require('popper.js')
require('bootstrap')

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
    let fullURL = "/api/user";

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
async function loginUser(username, password) {

	let data = {
        username: username,
        password: sha256(password)
    };
    	
    let fullURL = "http://localhost:8080/auth/token";

	let response = await axios({
		method: 'post',
		url: fullURL,
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
		},
		withCredentials: true,
		data: data
	})
	.then((res) => {
		let resJSON = res.data;
		if(resJSON.access_token && resJSON.type == "Bearer") {
			return true;
        }
        else {
			console.log(resJSON);
			return false;
		} 
	})
	.catch((err) => {
		console.log(err);
		return false;
	});

	return response;
}

export { loginUser };

function loadMain() {
    location.href = "/main";
}

