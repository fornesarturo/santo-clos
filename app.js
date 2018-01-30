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
    let user = req.query["name"] || "default";
    mariadb.query("SELECT * FROM test_santoclos.usuarios WHERE username = :id", 
        {id : user}, (err, rows) => {
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
});

apiRouter.route("/api/json/user")
    .get(cache(20), (req, res, next) => {
    let user = req.query["name"] || "default";
    mariadb.query("SELECT * FROM test_santoclos.usuarios WHERE username = :id",
        {id: user}, (err, rows) => {
            if (err) throw err;
            if (rows.info.numRows > 0) {
                let data = [];
                rows.forEach(element => {
                    data.push(element);
                    console.log(element);
                });
                res.json(data);
            }
        });
})

http.createServer(app).listen(8080, () => {
    mariadb = new MariaDBClient({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
    console.log("Listening on port 8080 . . .\n");
});