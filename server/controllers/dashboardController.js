const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

module.exports = {
  topFive: function(req, res) {
    let query = sqlstring.format(
      `select application_id, method, AVG(duration) as avg_duration, COUNT(*) as total_requests from transactions
where start_timestamp > ? AND application_id = ?
group by route,method,application_id
order by avg_duration desc
limit 5;`,
      [req.params.offset, req.params.application_id]
    );

    sql.query(query, (err, results, fields) => {
      err ? res.send(err) : res.send(results);
    });
  },

  quickStats: function(req, res) {
    let query = sqlstring.format(
      `select AVG(duration) as avg_duration, COUNT(*) as total_requests from transactions 
WHERE start_timestamp > ? and application_id = ?;`,
      [req.params.offset],
      [req.params.application_id]
    );

    sql.query(query, (err, results, fields) => {
      err ? res.send(err) : res.send(results);
    });
  }
};
