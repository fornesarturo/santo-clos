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
        res.status(200).sendFile(path.join(__dirname, '../html', 'index.html'));
    });

staticRouter.route('/main')
    .get(cache(20), auth.authenticateJWT, (req, res, next) => {
        if(req.cookies.tokenEvent) {
            let tokenEvent = req.cookies.tokenEvent;
            res.clearCookie("tokenEvent");
            auth.authenticateJWTInvite(tokenEvent).then((event) => {
                let id = event.eventId;
                let email = event.email;
                let user = req.cookies.current_user;
                mariadb.query("SELECT * FROM user WHERE username = :username", { username: user }, 
                (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let emailDB = util.process(rows)[0].email
                        if(email == emailDB) util.addUserToEvent(user, id, null);
                    }
                });
            });
        }
        res.status(200).sendFile(path.join(__dirname, '../html', 'main.html'));
    });

staticRouter.route('/logout')
    .get(cache(20), (req, res, next) => {
        res.clearCookie("token");
        res.clearCookie("current_user");
        res.status(200).sendFile(path.join(__dirname, '../html', 'index.html'));
    });

module.exports = staticRouter;