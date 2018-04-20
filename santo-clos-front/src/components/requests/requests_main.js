/* eslint-disable */
import axios from 'axios'

// Create EVENT in DB
export async function createEventRequest(name, date, address, amount) {
    let data = {
        name: name,
        date: date,
        address: address,
        amount: amount
    };

    let response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/event',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(res => {
        let resJSON = res.data;
        if(res.status == 200) {
            return resJSON.data;
        } 
        else {
            return null;
        }
    })
    .catch(err => {
        console.log('Error', err);
        return false;
    })

    return response;
}

export async function postEventParticipants(participants, eventId) {
    let data = {
        eventId: eventId,
        participants: participants
    };
    let response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/event/users',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(res => {
        let resJSON = res.data;
        if(!resJSON.inserted) {
            console.log("Error on postEventParticipants");
        }
        return resJSON;
    })
    .catch(err => {
        console.log('Error', err);
        return false;
    })

    return response;
}

// Get EVENTS where the user is participant
export async function getJoinedEventsRequest() {
    
    let response = await axios({
		method: 'get',
        url: "http://localhost:8080/api/user/joinedEvents",
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
		},
		withCredentials: true
    })
    .then(res => {
        let resJSON = res.data;
        if (resJSON.data) {
            return resJSON.data;
        }
        else {
            return null;
        };
    })
    .catch(err => {
        console.log('Error', err)
        return false
    });

    return response;
}

// Get EVENTS where the user is admin
export async function getEventsAdminRequest() {
    let response = await axios({
		method: 'get',
        url: "http://localhost:8080/api/user/events",
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
		},
		withCredentials: true
    })
    .then(res => {
        let resJSON = res.data;
        if (resJSON.data) {
            return resJSON.data;
        }
        else {
            console.log(resJSON);
            return null;
        };
    })
    .catch(err => {
        console.log('Error', err)
        return false
    });
    return response;
}

// Check if password is valid
export async function passwordValidationRequest(username, password) {
    let data = {
        username: username,
        password: sha256(password)
    };
    let response = await axios({
		method: 'post',
        url: "http://localhost:8080/auth/authPassword",
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data,
		withCredentials: true
    })
    .then(res => {
        let resJSON = res.data;
        if(resJSON.success) {
            return resJSON.success;
        }
        else return resJSON;
    })
    .catch(err => {
        console.log('Error', err)
        return false
    });

    return response;
}

// Update user data using PUT
export async function updateDataRequest(data) {
    let fullURL = "/api/user";
    let response = await axios({
		method: 'put',
        url: "http://localhost:8080/api/user",
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data,
		withCredentials: true
    }).then(res => res.json());
    
    return response;
}