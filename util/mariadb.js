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
    console.dir(rows);
});

module.exports = mariadb;