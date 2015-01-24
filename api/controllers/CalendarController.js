/**
 * CalendarController
 *
 * @description :: Server-side logic for managing Calendar
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ical = require('ical');

module.exports = {
    parse: function(req, res) {
        var url = req.param('url');
        
        console.log("Hey there!");
        console.log(url);

        ical.fromURL(url, "", function(err, data) {
            if (err)
                return res.json('ERROR');

            res.json(data);
        });
    }
};