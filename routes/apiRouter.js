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
                    util.sendError(res, 500, err)
                    return;
                }
                else {
                    res.redirect(307, '../../auth/token');
                }
            });
    else
        util.sendError(res, 400, "Some data was missing.");
});

// The following requests must be authenticated.
apiRouter.use(auth.authenticateJWT);

apiRouter.route("/user")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        if (user)
            mariadb.query("SELECT username, name, email FROM user WHERE username = :id",
                { id: user }, (err, rows) => {
                    if (err) {
                        res.json({ error: err });
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    })
    .put((req, res, next) => {
        let user = req.body.authUsername || false;
        if (user) {
            let toChange = [];
            if (req.body.name) toChange.push("name = '" + req.body.name + "'");
            if (req.body.password) toChange.push("password = '" + req.body.password + "'");
            if (req.body.email) toChange.push("email = '" + req.body.email + "'");
            let change = toChange.join(",");
            let query = "UPDATE user SET " + change + " WHERE username = '" + user + "'";
            if (change)
                mariadb.query(query, (err, rows) => {
                        if (err) {
                            util.sendError(res, 500, err);
                            return;
                        }
                        if (rows.info.affectedRows > 0) {
                            util.correctPost(req, res, null);
                            return;
                        }
                        else {
                            util.sendError(res, 404, "Not found in DB.");
                        }
                    });
            else
                util.sendError(res, 400, "Some data was missing.");
        }
    }

    );

apiRouter.route("/user/events")
    .get(cache(20), (req, res, next) => {
        let user = req.body.authUsername || false;
        if (user)
            mariadb.query("SELECT * FROM event WHERE admin = :user",
                { user: user }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/user/joinedEvents")
    .get(cache(20), (req, res, next) => {
        let user = req.body.authUsername || false;
        if (user)
            mariadb.query("SELECT * FROM event JOIN participant WHERE event.eventId = participant.eventId AND participant.username = :user AND event.admin != :user",
                { user: user}, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/event")
    .get(cache(20), (req, res, next) => {
        let eventId = req.query["id"] || false;
        if (user)
            mariadb.query("SELECT * FROM event WHERE eventId = :id",
                { id: eventId }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    })  
    .post((req, res, next) => {
        if (req.body)
            mariadb.query("INSERT INTO event(admin, name, eventDate, address, amount) VALUES(:admin, :name, :eventDate, :address, :amount)", 
            {
                admin: req.body.authUsername, name: req.body.name,
                eventDate: req.body.date, address: req.body.address,
                amount: req.body.amount
            }, (err, rows) => {
                if (err) {
                    util.sendError(res, 500, err);
                    return;
                }
                if (rows.info.affectedRows > 0) {
                    req.body.eventId = rows.info.insertId;
                    util.correctPost(req, res, rows.info.insertId);
                    return;
                }
                else {
                    util.sendError(res, 404, "Not found in DB.");
                }
            })
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/event/users")
    .get(cache(20), (req, res, next) => {
        let event = req.query["id"] || false;
        if (event)
            mariadb.query("SELECT * FROM participant WHERE eventId = :id",
                { id: event }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    })
    .post((req, res, next) => {
        if (req.body.eventId) {
            let participants = req.body.participants;
            while (participants.length > 0) {
                let participant = participants.pop();
                mariadb.query("SELECT * FROM user WHERE email = :email", { email: participant.email}, (err, rowsParticipants) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    else {
                        mariadb.query("SELECT user.name FROM user JOIN event WHERE username = admin and eventId = :evId",
                        {evId: req.body.eventId}, (err, rows) => {
                            if (err) {
                                util.sendError(res, 500, err);
                                return;
                            }
                            participant.adminName = util.process(rows)[0].name;
                            if (rowsParticipants.info.numRows > 0) {
                                // console.log("Already in DB");
                                util.addUserToEvent(util.process(rowsParticipants)[0].username, req.body.eventId, null);
                            }
                            else {
                                // This particular email isn't in our DB, so we send them an email invite.
                                // console.log("Not in DB");
                                util.sendEmailInvite(participant, auth.signJWTInvite(req.body.eventId, participant.email));
                            }
                        });
                    }
                });
            }
            util.correctPost(req, res, null);
        }
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/event/wishlist")
    .get(cache(20), (req, res, next) => {
        let user = req.body.authUsername || false;
        let event = req.query["id"] || false;
        if (user && event) {
            mariadb.query("SELECT wish FROM wish WHERE username = :username AND eventId = :id",
                { id: event, username: user }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.emptyWishlist(res);
                    }
                });
        }
        else
            util.sendError(res, 400, "Some data was missing.");
    })
    .post((req, res, next) => {
        let user = req.body.authUsername || false;
        let event = req.body.eventId || false;
        let wish = req.body.wish || false;
        if (user && event && wish)
            mariadb.query("INSERT INTO wish(eventId, username, wish) VALUES (:id, :username, :wishText)",
                { id: event, username: user, wishText: wish }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.affectedRows > 0) {
                        util.correctPost(req, res, null);
                        return
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/event/giftee")
    .get(cache(20), (req, res, next) => {
        let user = req.query["user"] || false;
        let event = req.query["id"] || false;
        if (user && event)
            mariadb.query("SELECT giftee FROM participant WHERE eventId = :id AND username = :username",
                { id: event, username: user }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.numRows > 0) {
                        let data = util.process(rows);
                        req.body.data = data;
                        next();
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    });

// Only expect to use this on GET requests.
apiRouter.use((req, res, next) => {
    res.charset = 'utf-8';
    let responseBody = {data: req.body.data, user: req.body.authUsername};
    res.json(responseBody);
});

module.exports = apiRouter;