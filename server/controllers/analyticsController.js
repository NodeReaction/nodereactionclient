const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");
const moment = require("moment");

const analyticsController = {};

// Given a time range, route, and method, return the avg. response time and # of requests
// for each 1/60th interval of time in the time range
analyticsController.graphData = (req, res, next) => { 
  let results = [];
  let cache = {};
  let seconds;
  let datetime;
  const {application_id, route, method, offset, time} = req.params;
  seconds = parseInt(offset) / 1000;
  let currentTime = new Date(Date.now()).toISOString().slice(0, 23).replace("T", " ");
  // todo: use sqlstring
  sql.query(
    `SET @date_min = '${time}';
    SET @date_max = '${currentTime}';

    CREATE TEMPORARY TABLE IF NOT EXISTS datesTable AS (
      SELECT *, FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(date_generator.date) / (${seconds} / 60)) * (${seconds} / 60)) as timekey2
         -- ifnull(avg(duration), 0) as sum_val
      from (
         select DATE_ADD(@date_min, INTERVAL (@i := @i + (${seconds} / 60)) - 1 SECOND) as 'date'
         from information_schema.columns,(SELECT @i := 0) gen_sub 
         where DATE_ADD(@date_min, INTERVAL @i SECOND) BETWEEN @date_min AND @date_max
      ) as date_generator
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS joinTable AS (
      SELECT * FROM datesTable as a
      LEFT JOIN (
        SELECT AVG(duration) as avgdur, COUNT(*) as numRequests, FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(start_timestamp) / (${seconds} / 60)) * (${seconds} / 60)) as timekey 
        FROM transactions
        WHERE application_id='${application_id}' and route='/${route}' and method='${method}' and start_timestamp > '${time}' 
        GROUP BY UNIX_TIMESTAMP(start_timestamp) DIV (${seconds} / 60), timekey
      ) as b
      ON a.timekey2 = b.timekey
      ORDER BY a.timekey2 ASC
    );
    
    SELECT timekey2, IFNULL(avgdur,0) AS avgduration, IFNULL(numRequests,0) AS numRequests FROM joinTable;
    DROP TABLE datesTable;
    DROP TABLE joinTable;`, 
  (err, result) => {
    if (err) return res.send(err); 
    result[4].forEach(elem => {
      let utc = elem.timekey2.toISOString().slice(0, 19).replace("T", " ");
      let utcToLocal = moment.utc(utc).toDate();
      let local = moment(utcToLocal).local().format('YYYY-MM-DD HH:mm:ss');
      let date1 = new Date('' + local + '');
      date1.setHours(date1.getHours() - 14)
      let localTime = date1.toISOString().slice(0, 19).replace("T", " ");
      elem.timekey2 = localTime;
    });
    res.locals.graphData = result;
    next();
  });
};

// Return the average duration of functions for a route
analyticsController.rangeData = (req, res, next) => {
  console.log('***params*** ', req.params);
  const {route, method, time} = req.params;
  sql.query(
    `select a.route, a.method, avg(a.duration), b.library, b.type, avg(b.duration) ` +
    `from transactions a ` +
    `right join traces b ` +
    `on a.transaction_id = b.transaction_id ` +
    `where a.start_timestamp > '${time}' and a.route='/${route}' and a.method='${method}' ` +
    `group by library, b.type;`, 
  (err, result) => {
    if (err) return res.send(err);
    res.locals.rangeData = result;
    res.send(res.locals);
  });
};

module.exports = analyticsController;