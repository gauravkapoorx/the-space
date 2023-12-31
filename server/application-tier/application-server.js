"use strict";
/* jshint node:true */

const debug = require("debug")("server:server");
const http = require("http");
const app = require("./app");
const port = normalizePort(process.env.PORT || "8000");

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}


module.exports = function () {

  const server = http.createServer(app);

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

    debug(`Listening on ${bind}`);
    console.log(`Listening on ${bind}`);
  }

  /**
   * Start the server.
   */
  this.startServer = function () {
    return new Promise(function (fulfill, reject) {
      server.on("error", onError);
      server.on("listening", onListening);

      server.listen(port, function () {
        var returnObject = {
          result: "App Server Started Successfully"
        };
        fulfill(returnObject);
        return;
      });
    });
  };

};