// MySQL db connection
let sql = require("../dbconfig.js");
let sqlstring = require("sqlstring");

const applicationController = {};

applicationController.applicationCreate = (req, res, next) => {
  const { applicationName, userId } = req.body;
  sql.query(
    sqlstring.format("INSERT INTO applications (user_id, name) VALUES (?,?)", [
      userId,
      applicationName
    ]),
    (error, result) => {
      if (error) {
        error = new Error("Database Error");
        error.functionName = "applicationController.create";
        error.status = 400;
        next(error);
      }
      // console.log(`applicationController.read ${results}`);
      res.locals.id = result.insertId;
      next();
    }
  );
};

applicationController.applicationRead = (req, res, next) => {
  let applicationId = req.params.id;
  sql.query(
    sqlstring.format("SELECT * FROM applications WHERE application_id=?", [
      applicationId
    ]),
    function(error, results, fields) {
      if (error) {
        error = new Error("Database Error");
        error.functionName = "applicationController.read";
        error.status = 400;
        next(error);
      }
      // console.log(`applicationController.read ${results}`);
      res.locals.application = results[0];
      next();
    }
  );
};

applicationController.applicationDelete = (req, res, next) => {
  let applicationId = req.params.id;
  sql.query(
    sqlstring.format("DELETE FROM applications WHERE application_id=?", [
      applicationId
    ]),
    function(error, results, fields) {
      if (error) {
        error = new Error("Database Error");
        error.functionName = "applicationController.read";
        error.status = 400;
        next(error);
      }
      // console.log(`applicationController.read ${results}`);
      res.locals.application = results;
      next();
    }
  );
};

applicationController.applicationsList = (req, res, next) => {
  const commentId = res.locals.id;
  sql.query(sqlstring.format("SELECT * FROM applications"), function(
    error,
    results,
    fields
  ) {
    if (error) {
      error = new Error("Database Error");
      error.functionName = "applicationController.listAll";
      error.status = 400;
      next(error);
    }
    // console.log(`applicationController.read ${results}`);
    res.locals.applications = results;
    next();
  });
};

applicationController.userApplications = (req, res, next) => {
  sql.query(
    sqlstring.format("SELECT * FROM applications WHERE user_id = ?", [
      req.params.user_id
    ]),
    (err, results, fields) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    }
  );
};

module.exports = applicationController;
