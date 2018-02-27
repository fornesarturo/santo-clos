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
            res.status(401);
            res.json({"error":err, "code": 401});
        } else {
            let user = decoded.name;
            res.json({ username: user });
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
                        access_token: bearToken
                    }
                    res.cookie("token", bearToken, 
                    { 
                        expires: new Date(Date.now() + (10 * 60 * 60 * 1000)), 
                        signed: true, 
                        httpOnly: true 
                    });
                    res.json(data);
                } else {
                    res.json({});
                }
            });
    }
});

module.exports = authRouter;