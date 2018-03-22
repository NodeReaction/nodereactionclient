"use strict";

const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

const agentController = {};

agentController.validate = (req, res, next) => {
  next();
};

agentController.create = (req, res, next) => {
  const transactions = req.body.transactions;
  const credentials = req.body.credentials;
  const d = new Date();
  console.log(`
    ===========Server received data from Agent===========\n
    time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
    transactions sent: ${JSON.stringify(transactions.length)}
    credentials: ${JSON.stringify(credentials)}
    `);

  transactions.forEach(transaction => {
    console.log(
      "=========================\n" +
        JSON.stringify(transaction) +
        "=========================\n"
    );
    const applicationId = credentials.appId;
    sql.query(
      sqlstring.format(
        "INSERT INTO transactions (application_id, route, method, user_agent, cookies, remote_address, start_timestamp, end_timestamp, duration) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          applicationId,
          transaction.route,
          transaction.method,
          transaction.userAgent,
          transaction.cookies,
          transaction.remoteAddress,
          transaction.traceTimer.startTimestamp,
          transaction.traceTimer.endTimestamp,
          transaction.traceTimer.duration
        ]
      ),
      function(error, results, fields) {
        if (error) {
          console.log("database error at transaction: ", error);
          next(error);
        }
        console.log("database save trasaction_id: ", results.insertId);
        transaction.traces.forEach(trace => {
          console.log("Inside trace: ", trace);
          sql.query(
            sqlstring.format(
              "INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) VALUES (?,?,?,?,?,?,?,?,?)",
              [
                applicationId,
                results.insertId,
                transaction.route,
                transaction.method,
                trace.library,
                trace.type,
                trace.traceTimer.startTimestamp,
                trace.traceTimer.endTimestamp,
                trace.traceTimer.duration
              ]
            ),
            function(err, results, fields) {
              if (err) {
                console.log("database error at trace: ", err);
                next(err);
              }
              console.log("database save trace_id: ", results);
            }
          );
        });
      }
    );
  });
  next();
};

module.exports = agentController;
