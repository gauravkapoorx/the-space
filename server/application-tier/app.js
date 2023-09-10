"use strict";
/* jshint node:true */
const Express = require("express");
const Cors = require("cors");
const CookieParser = require("cookie-parser");
const BodyParser = require("body-parser");
const path = require('path');

const Routes = require("./routes");
const app = new Express();

/* using cors for enabling cross-origin requests */
app.use(Cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", Cors());

/* adding response headers */
app.all("", function (req, res, next) { // jshint ignore:line
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //Auth Each API Request created by user.
  next();
});

/* allowed paths for api routes */
global.apiPaths = {};
global.apiPaths.externalServicesPath = "/api/v1/services/";
app.disable("x-powered-by");
app.use(BodyParser.json({
  extended: false,
  limit: global.apiConfig.maxBodySize
}));
app.use(BodyParser.urlencoded({
  extended: false
}));
app.use(new CookieParser());
app.enable("trust proxy");

/* 
API ROUTES
*/

app.use("/", Routes);

// error handler
app.use(async function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = req.app.get("env") === "development" ? err : {};
  /* This console.log has to be here to prevent jshint errors, nothing else can be done inside this error handler */
  console.log(err);
  console.log(next);
  res.status("500");
  res.json({
    "Error": err.message
  });
});

app.use(Express.static(path.join(__dirname, 'dist')));

module.exports = app;