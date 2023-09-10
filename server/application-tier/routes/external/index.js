/* jshint node:true */
const Express = require("express");
const Router = Express.Router();
const Routes = require("./routes");
Router.use("/file-handler" , Routes["file-handler"]);
module.exports = Router;