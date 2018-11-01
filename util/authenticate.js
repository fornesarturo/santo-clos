const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function signJWT(subParam) {
    let token = jwt.sign(
        {
            name: subParam
        },
        process.env.SANTO_CLOS_SECRET,
        {
            algorithm: 'HS256',
            audience: "santo-clos-server",
            issuer: "santoclos.herokuapp.com",
            subject: subParam,
            expiresIn: Math.floor(Date.now() / 1000) + (10 * 60 * 60)
        }
    );
    return token;
}

function signJWTInvite(eventId, email) {
    let token = jwt.sign(
        {
            eventId: eventId,
            email: email
        },
        process.env.SANTO_CLOS_SECRET,
        {
            algorithm: 'HS256',
            audience: "santo-clos-server",
            issuer: "santoclos.herokuapp.com",
            subject: "SignUp-EventInvite",
            expiresIn: Math.floor(Date.now() / 1000) + (10 * 60 * 60)
        }
    );
    return token;
}

async function authenticateJWTInvite(token) {
    return await jwt.verify(token, process.env.SANTO_CLOS_SECRET,
        {
            algorithms: ['HS256'],
            audience: "santo-clos-server",
            issuer: ["santoclos.herokuapp.com"],
            clockTolerance: 5,
            clockTimestamp: Date.now() / 1000
        }, function (err, decoded) {
            if (err) {
                console.log("Error Auth");
                // res.status(401);
                // res.json({ "error": err, "code": 401 });
            } else {
                return decoded;
            }
        });
}


function authenticateJWT (req, res, next) {
    let token = req.body.token || req.signedCookies.token;
    jwt.verify(token, process.env.SANTO_CLOS_SECRET,
        {
            algorithms: ['HS256'],
            audience: "santo-clos-server",
            issuer: ["santoclos.herokuapp.com"],
            clockTolerance: 5,
            clockTimestamp: Date.now() / 1000
        }, function (err, decoded) {
            if (err) {
                res.status(401);
                res.json({ "error": err, "code": 401 });
            } else {
                let user = decoded.name;
                req.body.authUsername = user;
                next();
            }
        });
}

module.exports.authenticateJWT = authenticateJWT;
module.exports.authenticateJWTInvite = authenticateJWTInvite;
module.exports.signJWT = signJWT;
module.exports.signJWTInvite = signJWTInvite;