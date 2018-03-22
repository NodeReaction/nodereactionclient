const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

module.exports = {
  getRoutes: function(req, res) {
    let date = "2018-03-15 03:36:49";
    let query = sqlstring.format(
      `SELECT application_id,route, method, count(transaction_id), avg(duration) FROM transactions
      WHERE start_timestamp > ?  AND application_id = ?
      GROUP BY application_id,route, method;`,
      [req.params.offset, req.params.application_id]
    );

    sql.query(query, (err, results, fields) => {
      err ? res.send(err) : res.send(results);
    });
  }
};
