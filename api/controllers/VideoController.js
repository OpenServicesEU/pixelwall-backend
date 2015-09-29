/**
 * VideoController
 *
 * @description :: Server-side logic for managing Videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var TransformStream = require('stream').Transform;
var UUIDGenerator = require('node-uuid');
var avconv = require('avconv');
var child = require('child_process');
var disk = require('skipper-disk')();
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

function buildConverterStream(options) {
    options = options || {};
    var log = options.log || function noOpLog(){};
    var format = options.format || 'webm';
    var __avconv = new avconv(['-v', 0, '-i', 'pipe:0', '-f', format, 'pipe:1']);
    __avconv.on('message', function(data) {
        process.stdout.write("avconv message: " + data);
    });
    __avconv.on('error', function(data) {
        process.stdout.write("avconv error: " + data);
    });
    var __converter__ = new TransformStream({objectMode: true});
    __converter__._transform = function(__file, enctype, next) {
        var converted = __file.pipe(__avconv);
        converted.fd = __file.fd;
        __converter__.push(converted);
        next();
    };
    return __converter__;
};

var directory = path.join(process.cwd(), 'uploads/video');

module.exports = {
    upload: function(req, res) {
        mkdirp(directory);
        var store = disk.receive(
            {
                dirname: directory
            },
            function whenDone(err, uploadedFiles) {
                console.log(uploadedFiles);
                if (err) {
                    return res.negotiate(err);
                } else {
                    return res.ok(
                        {
                            files: uploadedFiles,
                            textParams: req.params.all()
                        }
                    );
                }
            }
        );
        store.on('error', function(err) {
            res.serverError(err);
        });
        var files = [];
        var converter = buildConverterStream();
        converter.pipe(store);
        converter.on('finish', function() {
        });
        req.file('video').upload(
            {
                adapter: {
                    receive: function () {
                        return converter;
                    }
                },
                saveAs: function(__newFile, cb) {
                    var newName = UUIDGenerator.v4() + ".webm";
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
                res.ok(
                    {
                        files: files
                    }
                );
            }
        );
    },
    download: function(req, res) {
        var file = path.join(directory, req.params.video);
        fs.exists(file, function(exists) {
            if (!exists) {
                return res.notFound(file);
            }
            fs.createReadStream(file).pipe(res);
        })
    }
};

