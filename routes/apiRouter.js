const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
const mariadb = require('../util/mariadb.js');
const auth = require('../util/authenticate.js');

var apiRouter = express.Router();  

apiRouter.route("/user")
.post((req, res, next) => {
    if (req.body)
        mariadb.query("INSERT INTO user VALUES (:username, :password, :name, :email)",
            {
                username: req.body.username, password: req.body.password,
                name: req.body.name, email: req.body.email
            }, (err, rows) => {
                if (err) {
                    res.json({error: err});
                    return;
                }
                else {
                    res.redirect(307, '../../auth/token');
                }
            });
    else
        res.json(req.body);
});

// The following requests must be authenticated.
apiRouter.use(auth.authenticateJWT);

apiRouter.route("/user")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        if (user)
            mariadb.query("SELECT username, name, email FROM user WHERE username = :id",
                { id: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

apiRouter.route("/user/events")
    .get(cache(20), (req, res, next) => {
        let user = req.body.authUsername || false;
        if (user)
            mariadb.query("SELECT * FROM event WHERE admin = :user",
                { user: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

apiRouter.route("/user/joinedEvents")
    .get(cache(20), (req, res, next) => {
        let user = req.body.authUsername || false;
        let eventId = req.query["eventId"] || false;
        if (user && eventId)
            mariadb.query("SELECT * FROM participant WHERE username = :user AND eventID = :id",
                { user: user, id: eventId }, (err, rows) => {
                    if (err) throw err;
                    console.log(user, " ", eventId, " ", user && eventId);

                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        res.json(req.body);
                    }
                });
    });

apiRouter.route("/event")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        if (user)
            mariadb.query("SELECT * FROM event WHERE eventId = :id",
                { id: eventId }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    })  
    .post((req, res, next) => {
        if (req.body)
            mariadb.query("INSERT INTO event(admin, name, eventDate, address, amount) VALUES(:admin, :name, :eventDate, :address, :amount)", 
            {
                admin: req.body.authUsername, name: req.body.name,
                eventDate: req.body.eventDate, address: req.body.address,
                amount: req.body.amount
            }, (err, rows) => {
                if (err) throw err;
                let request = req.body;
                // req.body.data = request;
                req.body = {};
                req.body.data = request;
                req.body.data.eventId = rows.info.insertId;
                next();
            })
        else
            res.json(req.body);
    });

apiRouter.route("/event/users")
    .get(cache(20), (req, res, next) => {
        let event = req.query["id"] || false;
        if (event)
            mariadb.query("SELECT * FROM participant WHERE eventId = :id",
                { id: event }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });

    });

apiRouter.route("/event/wishlist")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.query("SELECT * FROM event JOIN wish ON event.eventId = wish.eventId AND wish.username = :username AND wish.eventId = :id",
                { id: event, username: user }, (err, rows) => {
                    if (err) throw err;
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                });
    });

apiRouter.route("/event/giftee")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.query("SELECT giftee FROM participant WHERE eventId = :id AND username = :username",
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
apiRouter.use((req, res, next) => {
    res.charset = 'utf-8';
    let responseBody = {data: req.body.data, user: req.body.authUsername};
    res.json(responseBody);
});

module.exports = apiRouter;