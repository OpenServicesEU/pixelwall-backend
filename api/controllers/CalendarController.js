/**
 * CalendarController
 *
 * @description :: Server-side logic for managing Calendar
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    parse: function(req, res) {
        var url = req.param('url');
        
        calendarParser.parseFromUrl(url, function(err, data) {
            if (err)
                return res.json('ERROR');

            res.json(data);
        });
    }
};