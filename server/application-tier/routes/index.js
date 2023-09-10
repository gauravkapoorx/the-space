/* jshint node:true */
const Express = require("express");
const Router = Express.Router();
const external = require("./external");
Router.use("/services", external);
module.exports = Router;