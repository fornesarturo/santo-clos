const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
var mariadb = require('../util/mariadb.js');
const path = require('path');

var staticRouter = express.Router();

staticRouter.route('/')
    .get(cache(20), (req, res, next) => {
        console.log(req.method + " " + (req.originalUrl || req.url));
        res.status(200).sendFile(path.join(__dirname, '../html', 'index.html'));
    });

module.exports = staticRouter;