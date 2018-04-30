const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('./util/logger.js');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8080;

var app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

app.use(express.static(__dirname + '/html'));
app.use(express.static(path.join(__dirname, 'santo-clos-front', 'static')));

app.use(function (req, res, next) {
    let origin = req.headers.origin;
    if(origin == null || origin == "null" || origin.length <= 0) {
        origin="*";
    }
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Accept");
    next();
});

app.use('/', require('./routes/staticRouter.js'));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', require('./routes/apiRouter.js'));
// app.use('/api/xml', require('./routes/xmlRouter.js'));

http.createServer(app).listen(PORT, () => {
    console.log(`Listening on port ${PORT} . . .\n`);
});