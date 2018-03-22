const sql = require("../dbconfig.js");

const sqlstring = require("sqlstring");

function graphData(req, res) {
  let query = sqlstring.format(
    `SELECT route,application_id,method,library,type, AVG(duration) as avg_duration, COUNT(*) as total_requests from traces 
WHERE start_timestamp > ? AND application_id = ?
GROUP BY route,method,library,type,application_id;`,
    [req.params.offset, req.params.application_id]
  );

  sql.query(query, (err, results, fields) => {
    err ? res.send(err) : res.send(results);
  });
}

module.exports = graphData;
