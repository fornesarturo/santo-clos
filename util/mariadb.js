const MariaDBClient = require('mariasql');
const dotenv = require('dotenv').config();

const mariadb = new MariaDBClient({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

module.exports = mariadb;