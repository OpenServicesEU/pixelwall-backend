var ical = require('ical');

module.exports = {
    parseFromUrl: function (url, cb) {
        
        ical.fromURL(url, "", function(err, data) {

            var events = [];

            for (var k in data) {
                if (!data.hasOwnProperty(k))
                    continue;
                
                var event = data[k];
                events.push(event);
            }

            cb(err, events);
        });
    }
};