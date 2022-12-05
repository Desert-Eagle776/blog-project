// import mysql from 'mysql2';
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'blog',
    password: 'root'
}).promise();

connection.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

module.exports = connection;