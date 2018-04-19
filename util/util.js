const express = require('express');
const o2x = require('object-to-xml');
const fetch = require('node-fetch');
const mail = require('./mailModule');
const mariadb = require('./mariadb');

function processQueryResult(rows) {
    let data = [];
    rows.forEach(element => {
        data.push(element);
    });
    return data;
}

function sendEmptyWishlist(res) {
    let JSONResponse = 
    {
        data: [],
        status: 200
    }
    res.json(JSONResponse);
}

function sendErrorJSON(res, errorCode, err) {
    let JSONResponse =
    {
        error: err || "No description",
        status: errorCode
    }
    res.status(errorCode);
    res.json(JSONResponse);
}

function correctInsertResult(req, res, eventId) {
    if (eventId) {
        let JSONResponse = 
        {
            data: req.body,
            status: 200
        }

        res.json(JSONResponse);
    }
    else {
        let JSONResponse = {
            inserted: req.body,
            status: 200
        }

        res.json(JSONResponse);
    }
}


async function shortenURL(url) {
    let data = {
        longUrl: url,
    };
    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    let fullURL = "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBShUiJ9PcIi1oFTw67otgpnnoNN0Kn8Hs";

    let response = await fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.id) {
            return resJSON.id;
        }
        else {
            console.log(resJSON);
        }
    });
    return response;
}

function sendEmailInvite(participant, token) {
    console.log("Sending sign in email invite to: ", participant.email);
    if(process.env.IS_LOCALHOST == "true") {
        var url = "http://localhost:8080/?tokenEvent=" + token;
    }
    else {
        var url = "https://santo-clos.herokuapp.com/?tokenEvent=" + token;
    }
    shortenURL(url).then((urlS) => {
        mail.sendMail(
            participant.email,
            "You've been invited to a SantoClos event!",
            "<h1>Hello!</h1>\
            <h2>" + participant.adminName + " invited you to an event!</h1>\
            <h2>Follow this link to sign up and join the event.</h2>\
            <a href=\"" + urlS + "\">Sign Up!</a>\
            <p>If you can't follow the previous link, please copy and paste the following address: </p>\
            <p> " + urlS + " </p>"
    
            // <a href=3D\"localhost:8080?t=" + token + "\">localhost:8080?t=" + token + "</a>"
        );
    });
}

function xml(data, res) {
    res.set('Content-Type', 'text/xml');
    res.send(o2x({
        '?xml version="1.0" encoding="utf-8"?': null,
        data
    }));
}

function addUserToEvent(username, eventId, giftee) {
    mariadb.query("INSERT INTO participant VALUES (:username, :eventId, :giftee)", { username: username, eventId: eventId, giftee: giftee }, 
    (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = 
{
    process: processQueryResult, 
    xml: xml, 
    correctPost: correctInsertResult, 
    emptyWishlist: sendEmptyWishlist, 
    sendError: sendErrorJSON,
    sendEmailInvite: sendEmailInvite,
    addUserToEvent: addUserToEvent,
};