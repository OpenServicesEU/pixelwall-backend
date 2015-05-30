var ical = require('ical');

module.exports = {
    parseFromUrl: function (url, cb) {
        
        ical.fromURL(url, "", function(err, data) {
            
            if (err) {
                cb(err, null);
                return;
            }

            var events = [];
            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);

            for (var k in data) {
                if (!data.hasOwnProperty(k))
                    continue;
                
                var event = data[k];
                
                if (event.end > today)
                    events.push(event);
            }

            cb(null, events);
        });
    }
};