const express = require('express');
const jwt = require('jsonwebtoken');
var mariadb = require('../util/mariadb.js');
const util = require('../util/util.js');

var authRouter = express.Router();

function signJWT(subParam) {
    let token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            aud: "santo-clos-server",
            iss: "santo-clos.herokuapp.com",
            sub: subParam
        },
        "santoclos",
        { algorithm: 'HS256' }
    );
    return token;
}

authRouter.route("/token")
.post((req, res, next) => {
    console.log(req.method + " " + (req.originalUrl || req.url));
    let username = req.body.username;
    let password = req.body.hash;
    if (username) {
        mariadb.query("SELECT * FROM user WHERE username = :id AND password = :pass",
            {id: username, pass: password}, (err, rows) => {
                if (err) throw err;
                if (rows.info.numRows > 0) {
                    let bearToken = signJWT(username);
                    res.charset = 'utf-8';
                    data = {
                        type: "Bearer",
                        access_token: bearToken
                    }
                    res.json(data);
                } else {
                    res.json({});
                }
            });
    }
});

module.exports = authRouter;