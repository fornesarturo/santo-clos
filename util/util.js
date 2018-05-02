const express = require('express');
const o2x = require('object-to-xml');
const fetch = require('node-fetch');
const mail = require('./mailModule');
const mariadb = require('./mariadb');
const BitlyClient = require('bitly');
const Bitly = BitlyClient(process.env.BITLY_TOKEN);

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

function correctDeleteResult(req, res) {
    let JSONResponse = {
        deleted: req.body,
        status: 200
    }
    res.json(JSONResponse);
}

async function shortenURL(url) {
    let response = await Bitly.shorten(encodeURIComponent(url))
    .then(function(result) {
        return result;
    })
    .catch(function(error) {
        console.log("IF ENV IS DEV, SHORTENING ERRORS EXPECTED:");
        console.error(error);
    });
    return response;
}

function sendEmailInvite(participant, token) {
    console.log("Sending sign in email invite to: ", participant.email);
    if(process.env.IS_LOCALHOST == "true") {
        var url = "http://localhost:8081/#/?tokenEvent=" + token;
        mail.sendMail(
            participant.email,
            "You've been invited to a SantoClos event!",
            "<h1>Hello!</h1>\
            <h2>" + participant.adminName + " invited you to an event!</h1>\
            <h2>Follow this link to sign up and join the event.</h2>\
            <a href=\"" + url + "\">Sign Up!</a>\
            <p>If you can't follow the previous link, please copy and paste the following address: </p>\
            <p> " + url + " </p>"
    
            // <a href=3D\"localhost:8080?t=" + token + "\">localhost:8080?t=" + token + "</a>"
        )
    }
    else {
        var url = "https://santo-clos.herokuapp.com/#/?tokenEvent=" + token;
        console.log("URL" + url);
        shortenURL(url).then((urlS) => {
            mail.sendMail(
                participant.email,
                "You've been invited to a SantoClos event!",
                "<h1>Hello!</h1>\
                <h2>" + participant.adminName + " invited you to an event!</h1>\
                <h2>Follow this link to sign up and join the event.</h2>\
                <a href=\"" + url + "\">Sign Up!</a>\
                <p>If you can't follow the previous link, please copy and paste the following address: </p>\
                <p> " + url + " </p>"
        
                // <a href=3D\"localhost:8080?t=" + token + "\">localhost:8080?t=" + token + "</a>"
            );
        });
    }
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
    correctDelete: correctDeleteResult
};