const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cache = require('./cache.js');
const o2x = require('object-to-xml');
const MariaDBClient = require('mariasql');
const dotenv = require('dotenv').config();
const path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mariadb;
var apiRouter = express.Router();

app.use(apiRouter);

app.use(express.static( __dirname + '/html'));

apiRouter.route('/')
.get(function(req, res, next) {
    res.status(200).sendFile(path.join(__dirname, 'html', 'index.html'));
});

apiRouter.route("/api/xml/user")
.get(cache(20), (req, res, next) => {
    let data;
    let user = req.query["name"] || false;
    if (user) {
        mariadb.query("SELECT * FROM santoclos.user WHERE username = :id",
        { id: user }, (err, rows) => {
            if (err) throw err;
            if (rows.info.numRows > 0) {
                let data = [];
                rows.forEach(element => {
                    data.push(element);
                });
                console.log(data);
                res.set('Content-Type', 'text/xml');
                res.send(o2x({
                    '?xml version="1.0" encoding="utf-8"?': null,
                    data
                }));
            }
        });
    }
});

apiRouter.route("/api/json/user")
.get(cache(20), (req, res, next) => {
    let user = req.query["name"] || false;
    if (user) {
        mariadb.query("SELECT * FROM santoclos.user WHERE username = :id",
        {id: user}, (err, rows) => {
            if (err) throw err;
            if (rows.info.numRows > 0) {
                let data = [];
                rows.forEach(element => {
                    data.push(element);
                    console.log(element);
                });
                res.header("Content-Type", "application/json; charset=utf-8");
                res.json(data);
            }
        });
    }
})

apiRouter.route("/api/user")
.post((req, res, next) => {
    console.log(req.body);
    if (req.body)
        mariadb.query("INSERT INTO santoclos.user VALUES (:username, :password, :name, :email)",
        {username: req.body.username, password: req.body.password,
            name: req.body.name, email: req.body.email}, (err, rows) => {
            if (err) throw err;
            console.dir(rows);
            res.json(req.body);
        });
    else
        res.json(req.body);
});

apiRouter.route("/api/event/users")
.get(cache(20), (req, res, next) => {
    let event = req.query["id"] || false;
    if (event)
        mariadb.query("SELECT * FROM santoclos.participant WHERE eventId = :id",
        {id: event}, (err, rows) => {
            if (err) throw err;
            if (rows.info.numRows > 0) {
                let data = [];
                rows.forEach(element => {
                    data.push(element);
                    console.log(element);
                });
                res.charset = 'utf-8';
                res.json(data);
            }
        });

});

apiRouter.route("/api/event/wishlist")
.get(cache(20), (req, res, next) => {
    let user = req.query["user"] || false;
    if (user)
        mariadb.query("SELECT * FROM santoclos.event JOIN santoclos.wish ON event.eventId = wish.eventId AND wish.username = :username",
        {username:user}, (err, rows) => {
            if (err) throw err;
            if (rows.info.numRows > 0) {
                let data = [];
                rows.forEach(element => {
                    data.push(element);
                    console.log(element);
                });
                res.charset = 'utf-8';
                res.json(data);
            }
        });
});


http.createServer(app).listen(8080, () => {
    mariadb = new MariaDBClient({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
    console.log("Listening on port 8080 . . .\n");
});