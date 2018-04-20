/* eslint-disable */
import axios from 'axios'
const $ = require('jquery')
window.jQuery = $
window.Popper = require('popper.js')
require('bootstrap')

// Create USER in DB
async function registerUser(name, email, username, password) {
    let data = {
        username: username,
        password: sha256(password),
        name: name,
        email: email
    };
    let fullURL = "http://localhost:8080/api/user";

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
		if(resJSON.redirect = "/auth/token" && resJSON.username && resJSON.password) {
			return loginUser(resJSON.username, resJSON.password);
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

export { loginUser, registerUser };

function loadMain() {
    location.href = "/main";
}

