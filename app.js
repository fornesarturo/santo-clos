const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('./util/logger.js');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8080;

var app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

app.use('/', require('./routes/staticRouter.js'));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/json', require('./routes/apiRouter.js'));
app.use('/api/xml', require('./routes/xmlRouter.js'));

app.use(express.static( __dirname + '/html'));

http.createServer(app).listen(PORT, () => {
    console.log("Listening on port 8080 . . .\n");
});