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

//const cors = require('cors');    
//app.use(cors({credentials: true, origin: ['http://localhost:8081', 'http://localhost:8080', 'http://localhost:' + PORT]}));
// app.use(cors({credentials: true, origin: '*'}));

app.use(express.static(__dirname + '/html'));
app.use(express.static(path.join(__dirname, 'santo-clos-front', 'static')))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', require('./routes/staticRouter.js'));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', require('./routes/apiRouter.js'));
// app.use('/api/xml', require('./routes/xmlRouter.js'));

http.createServer(app).listen(PORT, () => {
    console.log(`Listening on port ${PORT} . . .\n`);
});