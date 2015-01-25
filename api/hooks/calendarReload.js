module.exports = function(sails) {

    return {

        // defaults config
        defaults: {
            calendarReload: {
                "interval": "1" /* refresh interval in minutes */,
                "disabled": "false" 
            } 
        },

        // runs automatically when the hook initializes
        initialize: function(cb) {
            var hook = this;
            var config = sails.config.calendarReload;

            if (config.disabled === true) {
                sails.log('Calendar reload is disabled!');
                return cb();
            }

            // lets wait on some of the sails core hooks to
            // finish loading before we load our hook
            var eventsToWaitFor = [];

            if (sails.hooks.orm)
                eventsToWaitFor.push('hook:orm:loaded');

            if (sails.hooks.pubsub)
                eventsToWaitFor.push('hook:pubsub:loaded');

            sails.after(eventsToWaitFor, function() {

                hook.run(config.interval);

                // invoke the callback and our hook will be usable
                return cb();
            });
        },

        run: function(interval) {
            
            var intervalInMilliseconds = interval * 60 * 1000;
            sails.log.info("Spawn task to reload calender data every " + interval + " minutes (" + intervalInMilliseconds + " ms).");

            setInterval(this.reloadCalendarData, intervalInMilliseconds);
        },

        reloadCalendarData: function() {
            
            sails.models.box.findByType('calendar').exec(function (err, calendarBoxes) {

                if (err) {
                    sails.log.error('Failed to load boxes of type "Calendar"!');
                    return;
                }

                calendarBoxes.forEach(function(box) {
                    if (!box.data.url)
                        return;

                    calendarParser.parseFromUrl(box.data.url, function(err, events) {
                        if (err)
                            return;

                        box.data.events = events;
                        box.save(function(e) {
                            if (e) {
                                sails.log.error('Failed to save updated calendar events!');
                                return;
                            }
                            
                            // Inform all clients about the updated calendar data.
                            // It's not needed as the data will be reloaded with 
                            // every page change but we do it anyway - because we can ;-)
                            sails.models.box.publishUpdate(box.id);
                        }); 
                    });
                });

                sails.log('Reloaded calendar data of ' + calendarBoxes.length + ' calendar boxes.');
            });
        }
    }
};