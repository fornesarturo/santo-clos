const express = require('express');

function mySubstr(str) {
    if(str.substr(0, 4) == "/api" || str.substr(0, 5) == "/auth" || str == "/") {
        return str;
    }
    else {
        return "";
    }
}

function logger(req, res, next) {
    let url = (req.originalUrl || req.url)
    if(mySubstr(url) != "") {
        console.log(req.method, " ", url);
    };
    next();
}

module.exports = logger;