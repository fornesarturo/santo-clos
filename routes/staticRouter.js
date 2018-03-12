const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
const mariadb = require('../util/mariadb.js');
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

staticRouter.route('/logout')
    .get(cache(20), (req, res, next) => {
        res.clearCookie("token");
        res.clearCookie("current_user");
        res.status(200).sendFile(path.join(__dirname, '../html', 'index.html'));
    });

module.exports = staticRouter;