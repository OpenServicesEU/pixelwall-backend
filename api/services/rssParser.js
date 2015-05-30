var feed = require("feed-read");

module.exports = {
    parseFromUrl: function (url, cb) {
        
        feed(url, function(err, articles) {
            
            if (err) {
                cb(err, null);
                return;
            }

            cb(null, articles);
        });
    }
};