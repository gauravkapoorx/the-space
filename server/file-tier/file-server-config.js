"use strict";

var s3ServerConfig = {
    masterServiceIntervalInMinutes: 1,
    maxJobWaitTimeInMinutes: 360,
    sftpTimeout: 1200000,
    redisConfigBullRemoveOnComplete: true,
    bullQueueMaxConcurrency: 50,
    redisConfigHost: "redis",
    redisConfigPort: "6379",
    redisConfigBullLockDuration: 150000,
    redisConfigBullStalledJobRetryCount: 0,
    redisConfigBullConcurrentJob: 1,
    reservedQueueName:"s3ServiceQueue"
};
module.exports = Object.assign({}, require("../application-tier/application-config"),s3ServerConfig)