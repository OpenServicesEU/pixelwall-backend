var ical = require('ical');

module.exports = {
    parseFromUrl: function (url, cb) {
        
        ical.fromURL(url, "", cb);
    }
};