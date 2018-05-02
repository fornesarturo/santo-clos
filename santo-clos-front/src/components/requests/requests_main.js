/* eslint-disable */
import axios from 'axios'
import '@/assets/vendor/js-cookie/js-cookie.js';

let port = ""
if(false) {
    port = "http://localhost:8080";
}
else {
    port = "http://138.197.219.40";
}

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
        url: port +'/api/event',
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

export async function postEventParticipants(eventId, participants) {
    console.log(eventId, participants);
    let data = {
        eventId: eventId,
        participants: participants
    };
    let response = await axios({
        method: 'post',
        url: port +'/api/event/users',
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
            return false;
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
        url: port +"/api/user/joinedEvents",
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
        url: port +"/api/user/events",
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
        url: port +"/auth/authPassword",
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
    let response = await axios({
		method: 'put',
        url: port +"/api/user",
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data,
		withCredentials: true
    })
    .then(res => res.json())
    .catch(err => {
        console.log('Error', err)
        return false
    });
    
    return response;
}

// Check if session is logged in
export async function checkIfLoggedIn() {
    let response = await axios({
        method: "post",
        url: port +"/auth/whoami",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then(
        (res) => {
            if(res.status == 200) return true;
            else return false;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return false
    });
    return response;
}

// Get my wishlist for designated event
export async function getMyWishlist(eventId) {
    let response = await axios({
        method: "get",
        url: port +"/api/event/wishlist?id="+ eventId + "&user=" + Cookies.get("current_user"),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200 && resJSON) return resJSON.data;
            else return null;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return null;
    });
    return response;
}

// Get wishlist for designated event and user
export async function getWishlist(eventId, username) {
    let response = await axios({
        method: "get",
        url: port +"/api/event/wishlist?id="+ eventId + "&user=" + username,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200 && resJSON) return resJSON.data;
            else return null;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return null;
    });
    return response;
}

// Get users for designated event
export async function getUsersFromEvent(eventId) {
    let response = await axios({
        method: "get",
        url: port +"/api/event/users?id="+ eventId,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200 && resJSON) return resJSON.data;
            else return null;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return null;
    });
    return response;
}

// Start (And draw in next call) designated event
export async function startEvent(eventId) {
    let data = {
        eventId: eventId
    };
    let response = await axios({
        method: "put",
        url: port +"/api/eventStart",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200){
                return draw(eventId);
            }
            else return false;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return false;
    });
    return response;
}

// Checks if can draw with available vetos, returns possible draw and vetos
export async function canDraw(eventId, vetos) {
    let data = {
        eventId: eventId,
        vetos: vetos
    };
    let response = await axios({
        method: "post",
        url: port +"/api/canDraw",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200){
                return resJSON.inserted;
            }
            else return false;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return false;
    });
    return response;
}

// Makes the actual draw
export async function draw(eventId) {
    let data = {
        eventId: eventId
    };
    let response = await axios({
        method: "post",
        url: port +"/api/draw",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200){
                return resJSON.inserted.draw;
            }
            else return false;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return false;
    });
    return response;
}

// Put wishlist (Erase and update) of user
export async function putAllWishes(eventId, wishes) {
    let wishesWish = [];
    for(let i in wishes) {
        wishesWish.push({wish: wishes[i].wish});
    }
    let data = {
        eventId: eventId,
        user: Cookies.get("current_user"),
        wishes: wishesWish
    };
    let response = await axios({
        method: "put",
        url: port +"/api/event/wishlist",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(
        (res) => {
            let resJSON = res.data;
            console.log(resJSON);
            if(res.status == 200 && resJSON){
                return resJSON.data;
            }
            else return null;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return null;
    });
    return response;
}

// Put wishlist (Erase and update) of user
export async function deleteEvent(eventId) {
    let data = {
        id: eventId,
    };
    let response = await axios({
        method: "delete",
        url: port +"/api/event",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    })
    .then(
        (res) => {
            let resJSON = res.data;
            if(res.status == 200){
                return true;
            }
            else return false;
        }
    )
    .catch(err => {
        console.log('Error', err)
        return null;
    });
    return response;
}