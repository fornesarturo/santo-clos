const express = require('express');
const o2x = require('object-to-xml');

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

function xml(data, res) {
    res.set('Content-Type', 'text/xml');
    res.send(o2x({
        '?xml version="1.0" encoding="utf-8"?': null,
        data
    }));
}

module.exports = 
{
    process: processQueryResult, 
    xml: xml, 
    correctPost: correctInsertResult, 
    emptyWishlist: sendEmptyWishlist, 
    sendError: sendErrorJSON
};