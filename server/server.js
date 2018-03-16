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

// API - ONLY TAKES JSON
app.use(bodyParser.json());

// STATICS
app.use(express.static(__dirname + "./../"));

// ROUTES
app.use("/api", apiRouter);

// START EXPRESS
app.listen(PORT, () => {
  console.log(
    `===========NODE REACTION SERVER===========\n\nListening on port: ${PORT}`
  );
});
