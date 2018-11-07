const express = require('express');
const util = require('../util/util.js');
const cache = require('../util/cache.js');
const mariadb = require('../util/mariadb.js');
const auth = require('../util/authenticate.js');
const drawer = require('../util/drawNames.js');

var apiRouter = express.Router();

apiRouter.route("/user")
.post((req, res, next) => {
    if (req.body)
        mariadb.postUser(req.body.username, req.body.password, req.body.name, req.body.email, req, res, next);
    else
        util.sendError(res, 400, "Some data was missing.");
});

// The following requests must be authenticated.
apiRouter.use(auth.authenticateJWT);

apiRouter.route("/user")
    .get((req, res, next) => {
        let user = req.query["user"] || false;
        if (user)
            mariadb.getUser(user, (err, rows) => {
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
                    util.sendError(res, 404, "Not found user in DB.");
                }
            });
        else
            util.sendError(res, 400, "Some data was missing.");
    })
    .put((req, res, next) => {
        mariadb.updateUser(req, res, next);
    });

apiRouter.route("/user/events")
    .get((req, res, next) => {
        let user = req.body.authUsername || false;
        if (user)
            mariadb.getUserEvents(user, (err, rows) => {
                if (err) {
                    util.sendError(res, 500, err);
                    return;
                }
                if (rows.info.numRows > 0) {
                    let data = util.process(rows);
                    req.body.data = data;
                    res.status(200);
                    next();
                }
                else {
                    util.sendError(res, 404, "Not found events in DB.");
                }
            });
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/user/joinedEvents")
    .get((req, res, next) => {
        let user = req.body.authUsername || false;
        if (user)
            mariadb.getUserJoinedEvents(user, (err, rows) => {
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
                    util.sendError(res, 404, "Not found joined events in DB.");
                }
            });
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/eventStart") 
    .put((req, res, next) => {
        if (req.body) {
            mariadb.eventStart(req.body.eventId, (err, rows) => {
                if (err) {
                    util.sendError(res, 500, err);
                    return;
                }
                if (rows.info.affectedRows > 0) {
                    util.correctPost(req, res, null);
                    return;
                }
                else {
                    util.sendError(res, 404, "Not found event in DB.");
                }
            });
        }
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/event")
    .get((req, res, next) => {
        let eventId = req.query["id"] || false;
        if (user)
            mariadb.getEvent(eventId, (err, rows) => {
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
                    util.sendError(res, 404, "Not found event in DB.");
                }
            });
        else
            util.sendError(res, 400, "Some data was missing.");
    })  
    .post((req, res, next) => {
        if (req.body)
            mariadb.postEvent(req.body.authUsername, req.body.name, req.body.date, req.body.address, req.body.amount, 
                (err, rows) => {
                    if (err) {
                        util.sendError(res, 500, err);
                        return;
                    }
                    if (rows.info.affectedRows > 0) {
                        req.body.eventId = rows.info.insertId;
                        util.addUserToEvent(req.body.authUsername, req.body.eventId, null);
                        util.correctPost(req, res, rows.info.insertId);
                        return;
                    }
                    else {
                        util.sendError(res, 404, "Not found in DB.");
                    }
                });
        else
            util.sendError(res, 400, "Some data was missing.");
    })
    .delete((req, res, next) => {
        let id = req.body.id;
        if (id)
            mariadb.deleteEvent(id, req, res, next)
        else
            util.sendError(res, 400, "Some data was missing.");
    })

apiRouter.route("/event/users")
    .get((req, res, next) => {
        let eventId = req.query["id"] || false;
        if (eventId)
            mariadb.getEventUsers(eventId, (err, rows) => {
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
                mariadb.postEventParticipant(participant, req, res, next);
            }
            util.correctPost(req, res, null);
        }
        else
            util.sendError(res, 400, "Some data was missing.");
    });

apiRouter.route("/event/wishlist")
    .get((req, res, next) => {
        mariadb.getEventWishlist(req, res, next);
    })
    .post((req, res, next) => {
        mariadb.postEventWishlist(req, res, next);
    })
    .put((req, res, next) => {
        mariadb.updateEventWishlist(req, res, next);
    });

apiRouter.route("/event/giftee")
    .get((req, res, next) => {
        mariadb.getEventGiftee(req, res, next);
    });

async function getEventParticipants(eventId) {
    let response = await new Promise((resolve, reject) => {
        mariadb.getEventParticipants(eventId, (err, rows) => {
            if (err) {
                reject(err);
            }
            if (rows.info.numRows > 0) {
                resolve(util.process(rows));
            }
            else {
                reject(false);
            }
        });
    });
    return response;

}

async function canDrawCheck(eventId, participants, veto) {
    let response = await drawer(participants, veto).then((draw) => {
        if (!draw) {
            return false;
        }
        return draw;
    });
    return response;
}

async function deleteAllVetos(eventId) {
    let response = await new Promise((resolve, reject) => {
        mariadb.deleteAllVetos(eventId, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            } 
        });
    })
    return response;
}

async function insertSingleVeto(eventId, vetoer, vetoed) {
    let response = await new Promise((resolve, reject) => {
        mariadb.insertSingleVeto(eventId, vetoer, vetoed, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(true);
        });
    });
    return response;
}

async function insertVetos(eventId, newVetos) {
    let response = await new Promise((resolve, reject) => {
        Object.keys(newVetos).forEach((vetoer) => {
            newVetos[vetoer].forEach((vetoed) => {
                insertSingleVeto(eventId, vetoer, vetoed).then((inserted) => {
                    if(!inserted) {
                        reject(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            })
        });
    });
    return response;
}

async function getCurrentVetos(eventId) {
    let response = await new Promise((resolve, reject) => {
        mariadb.getCurrentVetos(eventId, (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.info.numRows >= 0) {
                resolve(util.process(rows));
            }
        });
    });
    return response;
}

apiRouter.route("/canDraw")
    .post((req, res, next) => {
        let eventId = req.body.eventId;
        let newVetos = req.body.vetos || false;

        if (eventId) {
            getEventParticipants(eventId).then((participantsRaw) => {
                if(!participantsRaw) {
                    util.sendError(res, 500, err);
                }
                else {
                    let participants = [];
                    participantsRaw.forEach(element => {
                        participants.push(element.username);
                    });
                    if(newVetos) {
                        let vetoBuid = {};
                        canDrawCheck(eventId, participants, newVetos).then((canDraw) => {
                            if (!canDraw) {
                                util.sendError(res, 400, "Unable to draw");
                                return false;
                            }
                            else {
                                deleteAllVetos(eventId).then((deleted) => {
                                    if(!deleted) {
                                        util.sendError(res, 500, err);
                                    }
                                    else {
                                        insertVetos(eventId, newVetos).then((inserted) => {
                                            if(!inserted) {
                                                util.sendError(res, 500, err);
                                                return false;
                                            }
                                            else {
                                                req.body.vetos = newVetos;
                                                req.body.draw = canDraw;
                                                util.correctPost(req, res, null);
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    // Will check if old data works. IT SHOULD.
                    else {
                        getCurrentVetos(eventId).then((rawVetos) => {
                            if(!rawVetos) {
                                util.sendError(res, 500, err);
                            }
                            else {
                                let oldVeto = {};
                                participants.forEach(element => {
                                    oldVeto[element] = [];
                                })
                                rawVetos.forEach(element => {
                                    let vetoer = element.vetoer;
                                    if(oldVeto[vetoer]) {
                                        oldVeto[vetoer].push(element.vetoed);
                                    }
                                });
                                if(participants.length > 1) {
                                    canDrawCheck(eventId, participants, oldVeto).then((canDraw) => {
                                        if(!canDraw) {
                                            util.sendError(res, 500, err);
                                        }
                                        else {
                                            req.body.vetos = oldVeto;
                                            req.body.draw = canDraw;
                                            util.correctPost(req, res, null);
                                        }
                                    });
                                }
                                else {
                                    req.body.vetos = oldVeto;
                                    util.correctPost(req, res, null);
                                }
                            }
                        });
                    }
                }
            });
        }
        else {
            util.sendError(res, 400, "Some data was missing.");
        }
    });

async function putGiftee(eventId, user, giftee) {
    let response = await new Promise((resolve, reject) => {
        mariadb.putGiftee(eventId, user, giftee, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    })
}

apiRouter.route("/draw")
    .post((req, res, next) => {
        let eventId = req.body.eventId;
        // Populate participants using MariaDB.
        getEventParticipants(eventId).then((participantsRaw) => {
            let participants = [];
            participantsRaw.forEach(element => {
                participants.push(element.username);
            });

            getCurrentVetos(eventId).then((rawVeto) => {
                let veto = {};
                participants.forEach(element => {
                    veto[element] = [];
                })
                rawVeto.forEach(element => {
                    let vetoer = element.vetoer;
                    if(veto[vetoer]) {
                        veto[vetoer].push(element.vetoed);
                    }
                });

                canDrawCheck(eventId, participants, veto).then((draw) => {
                    if (!draw) {
                        util.sendError(res, 400, "Unable to draw");
                        return;
                    }
                    else {
                        Object.keys(draw).forEach((user) => {
                            let giftee = draw[user];
                            putGiftee(eventId, user, giftee);
                        })
                        req.body.draw = draw;
                        util.correctPost(req, res, null);
                    }
                });                
            });
        });
    });

// Only expect to use this on GET requests.
apiRouter.use((req, res, next) => {
    res.charset = 'utf-8';
    let responseBody = {data: req.body.data, user: req.body.authUsername};
    res.json(responseBody);
});

module.exports = apiRouter;