const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
var mariadb = require('../util/mariadb.js');

var xmlRouter = express.Router();

xmlRouter.route("/user")
    .get(cache(20), (req, res, next) => {
        console.log(req.method + " " + (req.originalUrl || req.url));
        let data;
        let user = req.query["user"] || false;
        if (user)
            mariadb.query("SELECT * FROM user WHERE username = :id",
                { id: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        util.xml(data, res);
                    }
                });
    });

xmlRouter.route("/event")
    .get(cache(20), (req, res, next) => {
        console.log(req.method + " " + (req.originalUrl || req.url));
        let user = req.query["user"] || false;
        if (user)
            mariadb.query("SELECT * FROM event WHERE eventId = :id",
                { id: eventId }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        util.xml(data, res);
                    }
                });
    })  

xmlRouter.route("/event/users")
    .get(cache(20), (req, res, next) => {
        console.log(req.method + " " + (req.originalUrl || req.url));
        let event = req.query["id"] || false;
        if (event)
            mariadb.query("SELECT * FROM participant WHERE eventId = :id",
                { id: event }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        util.xml(data, res);
                    }
                });

    });

xmlRouter.route("/event/wishlist")
    .get(cache(20), (req, res, next) => {
        console.log(req.method + " " + (req.originalUrl || req.url));
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.query("SELECT * FROM event JOIN wish ON event.eventId = wish.eventId AND wish.username = :username AND wish.eventId = :id",
                { id: event, username: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        util.xml(data, res);
                    }
                });
    });

xmlRouter.route("/event/giftee")
    .get(cache(20), (req, res, next) => {
        console.log(req.method + " " + (req.originalUrl || req.url));
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.query("SELECT giftee FROM participant WHERE eventId = :id AND username = :username",
                { id: event, username: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        util.xml(data, res);
                    }
                });
    });

module.exports = xmlRouter;