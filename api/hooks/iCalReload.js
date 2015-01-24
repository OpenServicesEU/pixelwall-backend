module.exports = function(sails) {

    return {

        // defaults config
        defaults: {
            iCalReload: {
                "timeout": "10000"
            } 
        },

        // runs automatically when the hook initializes
        initialize: function(cb) {
            var hook = this;
            var config = sails.config.iCalReload;
            
            // lets wait on some of the sails core hooks to
            // finish loading before we load our hook
            var eventsToWaitFor = [];

            if (sails.hooks.orm)
                eventsToWaitFor.push('hook:orm:loaded');

            if (sails.hooks.pubsub)
                eventsToWaitFor.push('hook:pubsub:loaded');

            sails.after(eventsToWaitFor, function() {

                sails.log("Spawn task to reload ical data every " + config.timeout + " ms.");
                
                hook.run(hook, config);

                // invoke the callback and our hook will be usable
                return cb();
            });
        },

        run: function(hook, config) {
            setInterval(hook.reloadCalendarData, config.timeout);
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

                    iCalParser.parseFromUrl(box.data.url, function(err, events) {
                        if (err)
                            return;

                        box.data.events = events;
                        box.save(function(e) {
                            if (e) {
                                sails.log.error('Failed to save updated calendar events!');
                                return;
                            }
                        }); 
                    });
                });

                sails.log('Reloaded ical data of ' + calendarBoxes.length + ' calendar boxes.');
            });
        }
    }
};