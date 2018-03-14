// MYSQL
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: "nodereaction",
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    // port     : process.env.RDS_PORT
  });
  connection.connect(function(err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }
    console.log("Connected to database.");
  });

  module.exports = connection;