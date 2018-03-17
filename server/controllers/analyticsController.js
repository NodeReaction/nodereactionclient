const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

const analyticsController = {};

// Given a time range, route, and method, return the avg. response time and # of requests
// for each 1/60th interval of time in the time range
analyticsController.responseTime = (req, res, next) => { 
  let results = [];
  let cache = {};
  const {route, method, offset, time} = req.params;
  // Convert milliseconds to seconds
  offset *= 1000;
  // todo: use sqlstring
  sql.query(
    `SELECT AVG(duration), COUNT(*) as numRequests, FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(start_timestamp) / (${offset} / 60)) * (${offset} / 60)) as timekey ` + 
    `FROM transactions ` +
    `WHERE route='/${route}' and method='${method}' and start_timestamp > '${time}' ` +
    `GROUP BY UNIX_TIMESTAMP(start_timestamp) DIV (${offset} / 60), timekey;`, 
  (err, result) => {
    if (err) return res.send(err);
    // Make an object from the results
    result.forEach(elem => {
      // Change time to seconds
      timeSec = (new Date(elem.timekey)).getTime() / 1000;
      // Save avg. time and # of requests
      cache[timeSec] = {};
      cache[timeSec]['avgTime'] = elem['AVG(duration)'];
      cache[timeSec]['numRequests'] = elem['numRequests'];
    });
    // Start time in seconds
    startRange = (new Date(`${time}`)).getTime() / 1000;
    // End time in seconds
    endRange = (new Date).getTime() / 1000;
    // Check if i is a property in cache
    // If not, fill the values with 0
    for (let i = startRange; i < endRange; i += (offset / 60)) {
      if (!cache.hasOwnProperty(i)) {
        cache[i] = {};
        cache[i]['avgTime'] = 0;
        cache[i]['numRequests'] = 0;
      }
    }
    res.locals.graphData = cache;
    next();
  });
};

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