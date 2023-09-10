"use strict";
/*jshint node:true*/

var ApplicationServer;
var s3Server;

ApplicationServer = require("./server/application-tier/application-server");
s3Server = require("./server/file-tier/file-server");
