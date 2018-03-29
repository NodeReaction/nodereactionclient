// MYSQL
const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT,
//   database: process.env.RDS_DB_NAME,
//   multipleStatements: true
// });

let db_config = {
  host: 'aadz8ce13521en.cwch5iv9x8ei.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'password',
  database: 'ebdb',
  multipleStatements: true
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); 

  connection.connect(function(err) {              
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });                                     
                                          
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                        
    } else {                                     
      throw err;                                  
    }
  });
}

handleDisconnect();

module.exports = connection;