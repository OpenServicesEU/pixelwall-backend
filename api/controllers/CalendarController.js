/**
 * CalendarController
 *
 * @description :: Server-side logic for managing Calendar
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ics = require('ics');

module.exports = {
    parse: function(req, res) {
        console.log("Hey there!");
        console.log(req.param('url'));
    }
};

