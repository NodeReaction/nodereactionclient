const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

const analyticsController = {};

// Given a time range, route, and method, return the avg. response time and # of requests
// for each 1/60th interval of time in the time range
analyticsController.responseTime = (req, res, next) => { 
  let arr = [];
  const {route, method, offset, time} = req.params;
  // offset *= 1000;
  sql.query(`SELECT AVG(duration), COUNT(*) as numRequests, FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(start_timestamp)/(${offset}/60))*(${offset}/60)) as timekey ` + 
            `FROM transactions ` +
            `WHERE route='/${route}' and method='${method}' and start_timestamp > '${time}' ` +
            `GROUP BY UNIX_TIMESTAMP(start_timestamp) DIV (${offset}/60), timekey;`, 
  (err, result) => {
    if (err) return res.send(err);
    console.log(result);
    result.forEach(elem => {
      let myDate = new Date(elem.timekey);
      let secondsDate = myDate.getTime() / 1000;
      console.log(secondsDate);
    });

    currentTime = new Date.getTime() / 1000;
    next();
  });
}
//and start_timestamp > '${timeSelector}'
module.exports = analyticsController;
// I can get the # of millisceonds in 5 minutes, 1 hours, etc
// time range and interval
// 5 minutes - 5 seconds
// 30 minuts - 30 seconds
// 1 hour = 1 minute
// 6 hours = 6 minutes
// 12 hours = 12 minutes
// 1 day = 24 minutes
// 3 days = 72 minutes