const express = require('express');
const util = require('../util/util.js');
const fetch = require('node-fetch');
const cache = require('../util/cache.js');
const mariadb = require('../util/mariadb.js');
const auth = require('../util/authenticate.js');
const path = require('path');

var staticRouter = express.Router();

staticRouter.route('/')
    .get(cache(20), (req, res, next) => {
        if(req.query.tokenEvent) {
            res.cookie("tokenEvent", req.query.tokenEvent);
        }
        res.status(200).sendFile(path.join(__dirname, '../santo-clos-front', "dist", 'index.html'));
    });

module.exports = staticRouter;