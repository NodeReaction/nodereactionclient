// ENV FILES
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const PORT = 3000;

// MIDDLEWARE
const path = require("path");
const bodyParser = require("body-parser");

// MYSQL
const connection = require("./dbconfig");

// ROUTERS
const apiRouter = require("./routers/apiRouter");

// CONTROLLERS
const analyticsController = require('./controllers/analyticsController');

// API - ONLY TAKES JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// STATICS
app.use(express.static(__dirname + "./../"));

// ROUTES
app.use("/api", apiRouter);

app.post('/test',
  analyticsController.responseTime,
  (req, res) => res.send('Success')
);

app.get('/test/:method/:route/:offset/:time',
  analyticsController.responseTime,
  (req, res) => res.send('Success')
);

// START EXPRESS
app.listen(PORT, () => {
  console.log(
    `===========NODE REACTION SERVER===========\n\nListening on port: ${PORT}`
  );
});
