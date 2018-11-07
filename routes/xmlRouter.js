const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
var mariadb = require('../util/mariadb.js');
const auth = require('../util/authenticate.js');

var xmlRouter = express.Router();

// The following requests must be authenticated.
xmlRouter.use(auth.authenticateJWT);

xmlRouter.route("/user")
    .get(cache(20), (req, res, next) => {
        let data;
        let user = req.query["user"] || false;
        if (user)
            mariadb.mariadb.query("SELECT username, name, email FROM user WHERE username = :id",
                { id: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

xmlRouter.route("/event")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        if (user)
            mariadb.mariadb.query("SELECT * FROM event WHERE eventId = :id",
                { id: eventId }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

xmlRouter.route("/event/users")
    .get(cache(20), (req, res, next) => {
        let event = req.query["id"] || false;
        if (event)
            mariadb.mariadb.query("SELECT * FROM participant WHERE eventId = :id",
                { id: event }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });

    });

xmlRouter.route("/event/wishlist")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.mariadb.query("SELECT * FROM event JOIN wish ON event.eventId = wish.eventId AND wish.username = :username AND wish.eventId = :id",
                { id: event, username: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

xmlRouter.route("/event/giftee")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.mariadb.query("SELECT giftee FROM participant WHERE eventId = :id AND username = :username",
                { id: event, username: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

// Only expect to use this on GET requests.
xmlRouter.use((req, res, next) => {
    res.charset = 'utf-8';
    let responseBody = { data: req.body.data, user: req.body.authUsername };
    util.xml(responseBody, res);
});

module.exports = xmlRouter;