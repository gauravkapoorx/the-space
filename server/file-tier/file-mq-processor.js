"use strict";
/*jshint node:true*/

const BullQueue = require("bull");
require("dotenv").config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

module.exports = /* @class */ function EventQueueManager() {

    var __bullSettings = {
        redis: {
            host: global.s3ServerConfig.redisConfigHost,
            port: global.s3ServerConfig.redisConfigPort
        },
        settings: {
            lockDuration: global.s3ServerConfig.redisConfigBullLockDuration,
            maxStalledCount: global.s3ServerConfig.redisConfigBullStalledJobRetryCount
        }
    };

    var __eventQueue = new BullQueue(global.s3ServerConfig.reservedQueueName, __bullSettings);

    const Bucket = process.env.BUCKET;
    aws.config.update({
        secretAccessKey: process.env.ACCESS_SECRET,
        accessKeyId: process.env.ACCESS_KEY,
        region: process.env.REGION,
    })
    const s3 = new aws.S3();

    __eventQueue.process(10, function (job, done) {
        try {
            __uploadFileToS3(job.data.file)
                .then(function (result) {
                    console.log(result);
                    done();
                })
                .catch(async function (ex) {
                    done(ex);
                });
        } catch (ex) {
            done(ex);
        }
    });

    function __uploadFileToS3(file) {
        return new Promise((resolve, reject) => {
            const upload = multer({
                storage: multerS3({
                    s3: s3,
                    bucket: Bucket,
                    acl: 'public-read', // Adjust the ACL as needed
                    key: (req, file, cb) => {
                        cb(null, file.originalname); // Set the S3 object key (filename)
                    },
                }),
            }).single('file');

            const fakeReq = { file };
            upload(file, null, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`File uploaded to S3: ${file.originalname}`);
                }
            });
        });
    }

};

