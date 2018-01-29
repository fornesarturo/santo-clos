const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const o2x = require('object-to-xml');
const MariaDBClient = require('mariasql');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiRouter = express.Router();

apiRouter.route("/api/xml")
.get((req, res, next) => {
    let data;
    let user = req.query["name"] || "default";
    if(data) {
        res.set('Content-Type', 'text/xml');
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?': null,
            data
        }));
    }
});

apiRouter.route("/api/json")
.get((req, res, next) => {
    let data;
    let user = req.query["name"] || "default";
    if(data) {
        res.json(data);
    }
})

http.createServer(app).listen(8080);