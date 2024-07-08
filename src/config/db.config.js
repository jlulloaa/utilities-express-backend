require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST.split(':')[0],
    port: process.env.DB_HOST.split(':')[1],
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); 

console.log('host: ' + process.env.DB_HOST.split(':')[0]);
console.log('port: ' + process.env.DB_HOST.split(':')[1]);
console.log('user: ' + process.env.DB_USER);
console.log('password: ' + process.env.DB_PASSWORD);
console.log('database: ' + process.env.DB_NAME);


connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);
  });
  
module.exports = connection;