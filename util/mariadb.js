const MariaDBClient = require('mariasql');
const dotenv = require('dotenv').config();

const mariadb = new MariaDBClient({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    db: process.env.DB_DATABASE
});

mariadb.query('SHOW DATABASES', (err, rows) => {
    if (err) throw err;
    else console.log("Connected to DB");
});

module.exports.postUser = function (username, password, name, email, req, res, next, util) {
    mariadb.query("INSERT INTO user VALUES (:username, :password, :name, :email)",
        {
            username: req.body.username, password: req.body.password,
            name: req.body.name, email: req.body.email
        }, (err, rows) => {
            if (err)
                return util.sendError(res, 500, err)
            else
                return util.correctPost(req, res, null)
        });
}

module.exports.getUser = function (user, cb) {
    mariadb.query("SELECT username, name, email FROM user WHERE username = :id",
        { id: user }, cb);
}

module.exports.updateUser = function (req, res, next, util) {
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
                    util.sendError(res, 404, "Not found user in DB.");
                }
            });
        else
            util.sendError(res, 400, "Some data was missing.");
    }
}

module.exports.getUserEvents = function (user, cb) {
    mariadb.query("SELECT * FROM event WHERE admin = :user",
        { user: user }, cb);
}

module.exports.getUserJoinedEvents = function (user, cb) {
    mariadb.query("SELECT * FROM event JOIN participant WHERE event.eventId = participant.eventId AND participant.username = :user AND event.admin != :user",
        { user: user }, cb);
}

module.exports.eventStart = function (eventId, cb) {
    let query = "UPDATE event SET started = 1 WHERE eventId = " + eventId;
    mariadb.query(query, cb);
}

module.exports.getEvent = function (eventId, cb) {
    mariadb.query("SELECT * FROM event WHERE eventId = :id",
        { id: eventId }, cb);
}

module.exports.postEvent = function (admin, name, eventDate, address, amount, cb) {
    mariadb.query("INSERT INTO event(admin, name, eventDate, address, amount) VALUES(:admin, :name, :eventDate, :address, :amount)",
        {
            admin, name,
            eventDate, address,
            amount
        }, cb);
}

module.exports.deleteEvent = function (id, req, res, next, util) {
    mariadb.query("DELETE FROM event WHERE eventId = :id", { id: id },
        (err, rows) => {
            if (err) {
                util.sendError(res, 500, err)
                return
            }
            if (rows.info.affectedRows >= 0) {
                mariadb.query("DELETE FROM participant WHERE eventId = :id", { id: id },
                    (err, rows) => {
                        if (err) {
                            util.sendError(res, 500, err)
                            return
                        }
                        if (rows.info.affectedRows >= 0) {
                            mariadb.query("DELETE FROM wish WHERE eventId = :id", { id: id },
                                (err, rows) => {
                                    if (err) {
                                        util.sendError(res, 500, err)
                                        return
                                    }
                                    if (rows.info.affectedRows >= 0) {
                                        mariadb.query("DELETE FROM veto WHERE eventId = :id", { id: id },
                                            (err, rows) => {
                                                if (err) {
                                                    util.sendError(res, 500, err)
                                                    return
                                                }
                                                util.correctDelete(req, res)
                                                return
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
            else {
                util.sendError(res, 400, "Not found in DB.")
            }
        }
    );
}

module.exports.getEventUsers = function (eventId, cb) {
    mariadb.query("SELECT user.username, eventId, giftee, name, email FROM participant JOIN user WHERE participant.eventId = :id AND participant.username = user.username",
        { id: eventId }, cb);
}

module.exports.getEventParticipants = function (eventId, cb) {
    mariadb.query("SELECT user.username FROM participant JOIN user WHERE participant.eventId = :id AND participant.username = user.username",
        { id: eventId }, cb);
}

module.exports.insertSingleVeto = function (eventId, vetoer, vetoed, cb) {
    mariadb.query("INSERT INTO veto VALUES (:eventId, :vetoer, :vetoed)", 
        {eventId, vetoer, vetoed }, cb);
}

module.exports.getCurrentVetos = function (eventId, cb) {
    mariadb.query("SELECT * FROM veto WHERE eventId = :eventId", { eventId }, cb);
}

module.exports.putGiftee = function (eventId, user, giftee, cb) {
    mariadb.query("UPDATE participant SET giftee = :giftee WHERE eventId = :eventId AND username = :user", 
        { eventId, user, giftee }, cb);
}

module.exports.deleteAllVetos = function (eventId, cb) {
    mariadb.query("DELETE FROM veto WHERE eventId = :eventId", { eventId }, cb);
}

module.exports.postEventParticipant = function (participant, req, res, next, util, auth) {
    mariadb.query("SELECT * FROM user WHERE email = :email", { email: participant.email }, (err, rowsParticipants) => {
        if (err) {
            util.sendError(res, 500, err);
            return;
        }
        else {
            mariadb.query("SELECT user.name FROM user JOIN event WHERE username = admin and eventId = :evId",
                { evId: req.body.eventId }, (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    participant.adminName = util.process(rows)[0].name;
                    if (rowsParticipants.info.numRows > 0) {
                        // console.log("Already in DB");
                        // util.addUserToEvent(util.process(rowsParticipants)[0].username, req.body.eventId, null);
                        util.sendEmailInvite(participant, auth.signJWTInvite(req.body.eventId, participant.email));
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

module.exports.getEventWishlist = function (req, res, next, util) {
    let user = req.query["user"] || false;
    let event = req.query["id"] || false;
    if (user && event) {
        mariadb.query("SELECT wishId, wish FROM wish WHERE username = :username AND eventId = :id",
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
}

module.exports.postEventWishlist = function (req, res, next, util) {
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
}

module.exports.updateEventWishlist = function (req, res, next, util) {
    let user = req.body.authUsername || false;
    let event = req.body.eventId || false;
    let wishes = req.body.wishes || false;
    if (user && event && wishes)
        mariadb.query("DELETE FROM wish WHERE username = :username AND eventId = :id",
            { id: event, username: user }, (err, rows) => {
                if (err) {
                    util.sendError(res, 500, err);
                    return;
                }
                if (rows.info.affectedRows >= 0) {
                    for (let wishId in wishes) {
                        mariadb.query("INSERT INTO wish(eventId, username, wish) VALUES (:id, :username, :wishText)",
                            { id: event, username: user, wishText: wishes[wishId].wish }, (err, rows) => {
                                if (err) {
                                    util.sendError(res, 500, err);
                                    return;
                                }
                                if (rows.info.affectedRows > 0) {
                                    return
                                }
                                else {
                                    util.sendError(res, 404, "Not found in DB.");
                                    return;
                                }
                            });
                    }
                    util.correctPost(req, res, null);
                    return
                }
                else {
                    util.sendError(res, 404, "Not found in DB.");
                }
            });
    else
        util.sendError(res, 400, "Some data was missing.");
}

module.exports.getEventGiftee = function (req, res, next, util) {
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
}

module.exports.mariadb = mariadb;