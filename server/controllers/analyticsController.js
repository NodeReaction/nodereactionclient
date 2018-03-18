const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

const analyticsController = {};

// Given a time range, route, and method, return the avg. response time and # of requests
// for each 1/60th interval of time in the time range
analyticsController.graphData = (req, res, next) => { 
  let results = [];
  let cache = {};
  let seconds;
  let datetime;
  const {route, method, offset, time} = req.params;
  seconds = parseInt(offset) / 1000;
  // todo: use sqlstring
  sql.query(
    `SET @date_min = '2018-03-14 23:00:03.533';
    SET @date_max = '2018-03-18 19:34:36.335';
    
    CREATE TEMPORARY TABLE IF NOT EXISTS datesTable AS (
      SELECT *, FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(date_generator.date) / (259200/60)) * (259200/60)) as timekey2
         -- ifnull(avg(duration),0) as sum_val
      from (
         select DATE_ADD(@date_min, INTERVAL (@i:=@i+72)-1 MINUTE) as 'date'
         from information_schema.columns,(SELECT @i:=0) gen_sub 
         where DATE_ADD(@date_min,INTERVAL @i MINUTE) BETWEEN @date_min AND @date_max
      ) as date_generator
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS joinTable AS (
      SELECT * FROM datesTable as a
      LEFT JOIN (
        SELECT AVG(duration) as avgdur, COUNT(*) as numRequests, FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(start_timestamp) / (259200/60)) * (259200/60)) as timekey 
        FROM transactions
        WHERE route='/dogs' and method='POST' and start_timestamp > '2018-03-14 23:00:03.533' 
        GROUP BY UNIX_TIMESTAMP(start_timestamp) DIV (259200/60), timekey
      ) as b
      ON a.timekey2 = b.timekey
      ORDER BY a.timekey2 ASC
    );
    
    SELECT timekey2, IFNULL(avgdur,0) AS avgduration, IFNULL(numRequests,0) AS numRequests FROM joinTable;`, 
  (err, result) => {
    if (err) return res.send(err); 
    console.log('**datetime* ', datetime);
    console.log('***params** ', req.params);
    res.locals.graphData = cache;
    res.send(cache);
  });
};

// Return the average duration of functions for a route
analyticsController.timeline = (req, res, next) => {
  const {route, method, time} = req.params;
  sql.query(
    `select b.library, b.type, avg(b.duration) ` +
    `from transactions a ` +
    `right join traces b ` +
    `on a.transaction_id = b.transaction_id ` +
    `where a.start_timestamp > '${time}' and a.route='/${route}' and a.method='${method}' ` +
    `group by b.library, b.type;`, 
  (err, result) => {
    if (err) return res.send(err);
    res.locals.timeline = result;
    next();
  });
};

module.exports = analyticsController;