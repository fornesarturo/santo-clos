const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
var mariadb = require('../util/mariadb.js');
const auth = require('../util/authenticate.js');
const path = require('path');

var staticRouter = express.Router();

staticRouter.route('/')
    .get(cache(20), (req, res, next) => {
        res.status(200).sendFile(path.join(__dirname, '../html', 'index.html'));
    });

staticRouter.route('/main')
    .get(cache(20), auth.authenticateJWT, (req, res, next) => {
        res.status(200).sendFile(path.join(__dirname, '../html', 'main.html'));
    });

module.exports = staticRouter;