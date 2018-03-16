const sql = require("../dbconfig.js");

const sqlstring = require("sqlstring");

function graphData(req, res) {
  let query = sqlstring.format(
    `SELECT route,method,library,type, AVG(duration) as avg_duration, COUNT(*) as total_requests from traces 
WHERE start_timestamp > ?
GROUP BY route,method,library,type;`,
    [req.params.offset]
  );

  sql.query(query, (err, results, fields) => {
    err ? res.send(err) : res.send(results);
  });
}

module.exports = graphData;
