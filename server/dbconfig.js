// MYSQL
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@lph@bets0oup",
  database: "nodereaction",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = connection;

// host: process.env.RDS_HOSTNAME,
// user: process.env.RDS_USERNAME,
// password: process.env.RDS_PASSWORD,
// port: process.env.RDS_PORT,
// database: process.env.RDS_DB_NAME,
