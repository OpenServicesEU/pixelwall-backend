/**
 * VideoController
 *
 * @description :: Server-side logic for managing Videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var UUIDGenerator = require('node-uuid');
var disk = require('skipper-disk')();
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var directory = path.join(process.cwd(), 'uploads/pdf');

module.exports = {
    upload: function(req, res) {
        mkdirp(directory);
        
        var store = disk.receive({ dirname: directory });
        store.on('error', function (err) {
            res.serverError(err);
        });
        
        var files = [];
        req.file('pdf').upload(
            {
                adapter: {
                    receive: function () {
                        return store;
                    }
                },
                saveAs: function(__newFile, cb) {
                    var newName = UUIDGenerator.v4() + '.pdf';
                    files.push(
                        {
                            name: __newFile.filename,
                            src: newName
                        }
                    );
                    cb(null, newName);
                },
                dirname: directory
            },
            function() {
                console.log("Sending back files: " + files);
                res.ok({ files: files });
            }
        );
    },
    download: function(req, res) {
        var file = path.join(directory, req.params.pdf);
        fs.exists(file, function(exists) {
            if (!exists) 
                return res.notFound(file);
            
            fs.createReadStream(file).pipe(res);
        });
    }
};

