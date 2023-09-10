"use strict";
/* jshint node:true */
const Gulp = require("gulp");
const GulpDependencyInstall = require("gulp-install");

Gulp.task("npm-install", Gulp.parallel([
    function () {
        return Gulp.src([
            "./application-tier/package.json"
        ]).pipe(GulpDependencyInstall({
            args: ['--prefer-offline &> /dev/null']
        }));
    },
    function () {
        return Gulp.src([
            "./file-tier/package.json"
        ]).pipe(GulpDependencyInstall({
            args: ['--prefer-offline &> /dev/null']
        }));
    },
]));