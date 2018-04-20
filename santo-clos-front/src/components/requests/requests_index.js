/* eslint-disable */
import axios from 'axios'

// Create USER in DB
export async function createUser(name, email, username, password) {
    let data = {
        username: username,
        password: sha256(password),
        name: name,
        email: email
    };

    let response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/user',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    }).then(res => {
        if (res.status == 200) {
            console.log("Load HUB!")
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
export async function loginUser(username, password) {

	let data = {
        username: username,
        password: sha256(password)
    };

	let response = await axios({
		method: 'post',
        url: "http://localhost:8080/auth/token",
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
			return true
        }
        else {
			console.log(resJSON);
			return false
		} 
	})
	.catch((err) => {
		console.log(err)
		return false
	});

	return response
}

