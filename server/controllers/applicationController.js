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
        err = new Error("Database Error");
        err.functionName = "applicationController.create";
        err.status = 400;
        next(err);
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
        err = new Error("Database Error");
        err.functionName = "applicationController.read";
        err.status = 400;
        next(err);
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
        err = new Error("Database Error");
        err.functionName = "applicationController.read";
        err.status = 400;
        next(err);
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
      err = new Error("Database Error");
      err.functionName = "applicationController.listAll";
      err.status = 400;
      next(err);
    }
    // console.log(`applicationController.read ${results}`);
    res.locals.applications = results;
    next();
  });
};

module.exports = applicationController;
