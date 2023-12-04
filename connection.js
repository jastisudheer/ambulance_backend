const mysql = require('mysql2');

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sudheer!2002',
  database: 'ats_db',
});

module.exports = connection;