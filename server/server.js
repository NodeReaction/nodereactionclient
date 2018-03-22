// ENV FILES
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const PORT = 3000;

// MIDDLEWARE
const path = require("path");
const bodyParser = require("body-parser");

// ROUTERS
const apiRouter = require("./routers/apiRouter");

// API - ONLY TAKES JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// STATIC CONTENT
app.use(express.static(__dirname + "./../"));

// ROUTES
app.use("/api", apiRouter);

app.get("*", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../", "index.html"));
});

// START EXPRESS
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `===========NODE REACTION SERVER===========\n\nListening on port: ${PORT}`
  );
});
