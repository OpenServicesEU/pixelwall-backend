module.exports.crontab = [
    {
        name: "Calendar poller",
        on: {
            minute: [0, 10, 20, 30, 40, 50]
        },
        run: function(sails) {
            sails.models.box.findByType('calendar').exec(function (err, calendarBoxes) {
                if (err) {
                    sails.log.error('Failed to load boxes of type "calendar": ' + err);
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
                                sails.log.error('Failed to save updated calendar eventsfor URL: ' + box.data.url);
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
            })
        }
    }
]
