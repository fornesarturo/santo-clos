const express = require('express');
const jwt = require('jsonwebtoken');
var mariadb = require('../util/mariadb.js');
const util = require('../util/util.js');
const auth = require('../util/authenticate.js');
const dotenv = require('dotenv').config();

var authRouter = express.Router();

authRouter.route("/whoami")
.post((req, res, next) => {
    console.log(req.method + " " + (req.originalUrl || req.url));
    let token = req.body.token || req.signedCookies.token;
    jwt.verify(token, process.env.SANTO_CLOS_SECRET, 
        {
            algorithms: ['HS256'],
            audience: "santo-clos-server", 
            issuer: ["santo-clos.herokuapp.com"], 
            clockTolerance: 5,
            clockTimestamp: Date.now() / 1000
        }, function(err, decoded) {
        if (err) {
            util.sendError(res, 401, err);
        } else {
            let userServer = decoded.name;
            let userClient = req.body.user || req.cookies.current_user;
            if(userServer === userClient) res.status(200).json({}).send();
            else util.sendError(res, 401, err);
        }
    });
});

authRouter.route("/token")
.post((req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username) {
        mariadb.query("SELECT * FROM user WHERE username = :id AND password = :pass",
            {id: username, pass: password}, (err, rows) => {
                if (err) throw err;
                if (rows.info.numRows > 0) {
                    let bearToken = auth.signJWT(username);
                    res.charset = 'utf-8';
                    data = {
                        type: "Bearer",
                        access_token: bearToken,
                        current_user: username
                    }
                    res.cookie("token", bearToken, 
                    { 
                        expires: new Date(Date.now() + (10 * 60 * 60 * 1000)), 
                        signed: true, 
                        httpOnly: true 
                    });
                    if (req.query.tokenEvent) {
                        let tokenEvent = req.query.tokenEvent;
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
                                        if (email == emailDB) util.addUserToEvent(user, id, null);
                                        res.cookie("current_user", username);
                                        res.json(data);
                                    }
                                });
                        });
                    } else {
                        res.cookie("current_user", username);
                        res.json(data);
                    }
                } else {
                    res.json({});
                }
            });
    }
});

authRouter.route("/authPassword")
.post((req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username) {
        mariadb.query("SELECT * FROM user WHERE username = :id AND password = :pass",
            {id: username, pass: password}, (err, rows) => {
                if (err) throw err;
                if (rows.info.numRows > 0) {
                    data = {
                        success: 1,
                    }
                    res.json(data);
                } 
                else {
                    data = {
                        success: -1,
                    }
                    res.json(data);
                }
            });
    }
});

module.exports = authRouter;