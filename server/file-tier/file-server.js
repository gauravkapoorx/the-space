"use strict";
/* jshint node:true */
const BullQueue = require("bull");
const s3ServerQueue = require("./file-mq-processor");
global.s3ServerConfig = require("./file-server-config");

function startServer() {
    return new Promise(function (fulfill, reject) {
        var s3Queue;
        s3Queue = new s3ServerQueue();
        var bullSettings = {
            redis: {
                host: global.s3ServerConfig.redisConfigHost,
                port: global.s3ServerConfig.redisConfigPort
            }
        }
        global.queues = {};
        global.queues[global.s3ServerConfig.reservedQueueName] = new BullQueue(global.s3ServerConfig.reservedQueueName, bullSettings);
        var returnObject = {
            result: "File Server Started Successfully."
        };
        fulfill(returnObject);
        return;
    });
};

startServer()
    .then(function (startResult) {
        if (startResult?.err) {
            console.log("PB6000-2000: Node startup failed check messaging-start");
            process.exit();
        } else {
            console.log(startResult.result);
        }
    })
    .catch(function (ex) {
        console.error("error", "PB6000-2000: Node startup failed check file-server onListening Ex: " + JSON.stringify(ex));
        process.exit();
    });



return;
