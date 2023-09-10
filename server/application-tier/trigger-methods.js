"use strict";
/* jshint node:true */

const Config = require("./application-config");
//const { genericIncomingMessageApi } = require("./pb-codes");

module.exports = {
    uploadFileOnS3: function (fileObject) {
        try {
            var message = {
                file: fileObject,
                eventType:"UPLOAD_FILE",
            };
            global.queues[Config.reservedQueueName].add(message, {
                timeout: 120000,
                attempts: 1,
                removeOnComplete: Config.redisConfigBullRemoveOnComplete
            });
            return;
        } catch (ex) {
            throw ex;
        }
    }
};