let sql = require("../dbconfig.js");
let sqlstring = require("sqlstring");

const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userController = {};

// Creates a new user in the database with bcrypt
userController.userCreate = (req, res, next) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
  console.log(
    "create user: " +
      email +
      " username: " +
      username +
      " password: " +
      password
  );
  sql.query(
    sqlstring.format(
      "INSERT INTO users (email, username, password) VALUES (?,?,?)",
      [email, username, hashedPassword]
    ),
    (err, results, fields) => {
      if (err) {
        let err = new Error("Invalid credentials or duplicate email/username");
        err.functionName = "userController.createUser";
        err.status = 400;
        next(err);
      } else {
        res.locals.auth = true;
        res.locals.userId = results.insertId; // Sends back primary key of created user
        next();
      }
    }
  );
};

// Creates a new user in the database with bcrypt
userController.userRead = (req, res, next) => {
  const { id } = req.params;
  sql.query(
    sqlstring.format("SELECT * from users WHERE id=?", [id]),
    (err, results, fields) => {
      if (err) {
        err = new Error("Invalid credentials");
        err.functionName = "userController.createUser";
        err.status = 400;
        next(err);
      } else {
        //   res.locals.userId = results.insertId;
        next();
      }
    }
  );
};

// Creates a new user in the database with bcrypt
userController.userUpdate = (req, res, next) => {
  const { id, email, username } = req.body;
  sql.query(
    sqlstring.format("UPDATE users SET email=?, username=? WHERE id=?", [
      email,
      username,
      id
    ]),
    (err, results, fields) => {
      if (err) {
        err = new Error("Invalid credentials");
        err.functionName = "userController.createUser";
        err.status = 400;
        next(err);
      } else {
        //   res.locals.userId = results.insertId;
        next();
      }
    }
  );
};

// Creates a new user in the database with bcrypt
userController.userDelete = (req, res, next) => {
  const { id } = req.params;
  sql.query(
    sqlstring.format("DELETE from users SETWHERE id=?", [id]),
    (err, results, fields) => {
      if (err) {
        err = new Error("Invalid credentials");
        err.functionName = "userController.delete";
        err.status = 400;
        next(err);
      } else {
        //   res.locals.userId = results.insertId;
        next();
      }
    }
  );
};
// Creates a new user in the database with bcrypt
userController.usersList = (req, res, next) => {
  const { id } = req.params;
  sql.query(
    sqlstring.format("SELECT * from users", [id]),
    (err, results, fields) => {
      if (err) {
        err = new Error("Invalid credentials");
        err.functionName = "userController.delete";
        err.status = 400;
        next(err);
      } else {
        res.locals.users = results;
        next();
      }
    }
  );
};

// Verifies the user credentials
// Possible extension: For increased security, delay response if error or invalid credentials
userController.userVerify = (req, res, next) => {
  const { username, password } = req.body;
  sql.query(
    sqlstring.format(
      "SELECT * FROM users WHERE username = ? AND password = ?;",
      [username, password]
    ),
    (err, results, fields) => {
      if (err) {
        err = new Error("Database error");
        err.functionName = "userController.verifyUser";
        err.status = 400;
        next(err);
      }
      console.log('results =====>' + results);
      if (results.length) {
        
        res.locals.auth = true;
        res.locals.userId = results[0].user_id;
        // valid credentials
        next();
      } else {
        err = new Error("Invalid credentials username: " + username + " password: " + password);
        err.functionName = "userController.verifyUser";
        err.status = 400;
        next(err);
      }
    }
  );
};

userController.userIsLoggedIn = (req, res, next) => {
  // console.log('req.cookies ' + req.cookies);
  if (req.cookies !== undefined && req.cookies.ssid !== undefined) {
    // If they do, compare cookie on database against user _id
    console.log(
      "userController.isLoggedIn - they have a cookie and are logged in"
    );
    next();
  } else {
    let err = new Error("You have no cookies!!");
    err.functionName = "sessionController.isLoggedIn - ";
    err.status = 400;
    next(err);
  }
  next();
};

module.exports = userController;
