var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '12345678',
    database: '29_11_HW'
  });

  
module.exports = connection