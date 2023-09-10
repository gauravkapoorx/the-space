"use strict";
/* jshint node:true */
const Express = require("express");
const Router = Express.Router();
const aws = require("aws-sdk");
const triggerMethods = require("../../trigger-methods");
const multer = require('multer');
const multerS3 = require("multer-s3");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

require("dotenv").config();

const bucket =  process.env.BUCKET;
aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
});

const s3 = new aws.S3();


Router.get("/all-files",async(req,res)=>{
    let bucketFiles =  await s3.listObjectsV2({
        Bucket:bucket
    }).promise();
    let files = bucketFiles.Contents.map(item=>item.Key);
    res.send(files);
});

Router.get("/download/:fileName",async(req,res)=>{
    let file =  await s3.getObject({
        Bucket:bucket,
        Key:req.params.fileName
    }).promise();
    res.send(file.Body);
});

Router.post("/upload-queue", upload.single('file'),async (req, res) => { /* jshint ignore:line */
    try {
        triggerMethods.uploadFileOnS3(req.file);
        res.status(200).json({
            isActionSuccess: true,
        });

    } catch (ex) {
        /** When errors occur, call insert log and respond to the http request */
        res.status(500).json({
            code: "ERROR"
        });
    }
});

Router.post("/", upload.single('file'),async (req, res) => { /* jshint ignore:line */
    try {
        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: bucket,
                acl: 'public-read', // Adjust the ACL as needed
                key: (req, file, cb) => {
                    cb(null, file.originalname); // Set the S3 object key (filename)
                },
            }),
        });

        console.log('File uploaded:', req.file);

        res.status(200).json({
            isActionSuccess: true,
        });

    } catch (ex) {
        /** When errors occur, call insert log and respond to the http request */
        res.status(500).json({
            code: "ERROR"
        });
    }
});

module.exports = Router;