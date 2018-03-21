const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

module.exports = {
  topFive: function(req, res) {
    let date = "2018-03-15 03:36:49";
    let query = sqlstring.format(
      `select route, method, AVG(duration) as avg_duration, COUNT(*) as total_requests from transactions
where start_timestamp > ?
group by route,method
order by avg_duration desc
limit 5;`,
      [req.params.offset]
    );

    sql.query(query, (err, results, fields) => {
      err ? res.send(err) : res.send(results);
    });
  },

  quickStats: function(req, res) {
    let date = "2018-03-15 03:36:49";
    let query = sqlstring.format(
      `select AVG(duration) as avg_duration, COUNT(*) as total_requests from transactions 
WHERE start_timestamp > ?;`,
      [req.params.offset]
    );

    sql.query(query, (err, results, fields) => {
      err ? res.send(err) : res.send(results);
    });
  }
};
