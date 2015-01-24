/**
 * ImagesController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var UUIDGenerator = require('node-uuid');
var disk = require('skipper-disk')();
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var directory = path.join(process.cwd(), 'uploads/images');

module.exports = {
    upload: function(req, res) {
        mkdirp(directory);
        var store = disk.receive(
            {
                dirname: directory
            }
        );
        store
        .on('error', function(err) {
            res.serverError(err);
        });
        var files = [];
        req.file('images').upload(
            {
                adapter: {
                    receive: function () {
                        return store;
                    }
                },
                saveAs: function(__newFile, cb) {
                    var newName = UUIDGenerator.v4() + path.extname(__newFile.filename);
                    files.push(newName);
                    cb(null, newName);
                },
                dirname: directory
            },
            function() {
                console.log("Sending back files: " + files);
                res.ok(
                    {
                        files: files
                    }
                );
            }
        );
    },
    download: function(req, res) {
        var file = path.join(directory, req.params.image);
        fs.exists(file, function(exists) {
            if (!exists) {
                return res.notFound(file);
            }
            fs.createReadStream(file).pipe(res);
        });
    }
};

