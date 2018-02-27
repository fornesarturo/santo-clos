const express = require('express');

function logger(req, res, next) {
    console.log(req.method + " " + (req.originalUrl || req.url));
    next();
}

module.exports = logger;