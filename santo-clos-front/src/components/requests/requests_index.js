/* eslint-disable */
import axios from 'axios'

let port = ""
if(false) {
    port = "http://localhost:8080";
}
else {
    port = "https://santoclos.herokuapp.com";
}

// Create USER in DB
export async function createUser(name, email, username, password, eventToken="") {
    let data = {
        username: username.toLowerCase(),
        password: sha256(password),
        name: name,
        email: email
    };

    let response = await axios({
        method: 'post',
        url: port + '/api/user' + eventToken,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    }).then(res => {
        if (res.status == 200) {
            return true
        } else{
            console.log(res)
            return false
        }

    }).catch(err => {
        console.log('Error', err)
        return false
    })

    return response
}

// Login USER
export async function loginUser(username, password, eventToken="") {

	let data = {
        username: username.toLowerCase(),
        password: sha256(password)
    };

	let response = await axios({
		method: 'post',
        url: port + "/auth/token" + eventToken,
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
		},
		withCredentials: true,
		data: data
	})
	.then((res) => {
        let resJSON = res.data;
        document.cookie = "current_user=" + res.data.current_user;
		if(resJSON.access_token && resJSON.type == "Bearer") {
			return true
        }
        else {
			return false
		} 
	})
	.catch((err) => {
		console.log(err)
		return false
	});

	return response
}

