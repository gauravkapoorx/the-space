"use strict";
/* jshint node:true */
const RedisClient = require("redis");
const BullQueue = require("bull");

global.apiConfig =  require("./application-config");

const ApplicationServer = require("./application-server");

var applicationServer = new ApplicationServer();

/**
 * Starts the application server by creating connection and starting the listeners
 * @param {Object} ModelCollection - collection of models to be created
 */
applicationServer.startServer()
    .then(function (startResult) {
        if (startResult.err) {
            console.log("PB6000-1000: Node startup failed check application-start");
            process.exit();
        } else {
            /*BEGIN: Creation of bull queues for adding messages*/
            var bullSettings = {
                redis: {
                    host: global.apiConfig.redisConfigHost,
                    port: global.apiConfig.redisConfigPort
                }
            };

            global.queues = {};
            global.queues[global.apiConfig.reservedQueueName] = new BullQueue(global.apiConfig.reservedQueueName, bullSettings);
            

            /* Create a global connection for redis that can be used by APIs to communicate directly with redis */
            global.redisClient = RedisClient.createClient(global.apiConfig.redisConfigPort, global.apiConfig.redisConfigHost);
            console.log(startResult.result);
            return;
        }
    })
    .catch(function (ex) {
        console.error("error", "PB6000-1000: Node startup failed check application-start onListening Ex: " + ex.stack);
        /* This may cause the line above to fail since it is not a promise, however it isn't a concern 
         * because it is likely a database error and wouldn't be able to log. Instead we stop the Node server 
         * which will cause the application to be unavailable and should fail any deployments. */
        process.exit();
    });
