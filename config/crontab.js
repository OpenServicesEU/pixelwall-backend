module.exports.crontab = [
    {
        name: "Calendar poller",
        on: {
            minute: [0, 10, 20, 30, 40, 50]
        },
        run: function(sails) {
            sails.models.box.findByType('calendar').exec(function(err, calendarBoxes) {
                if (err) {
                    sails.log.error('Failed to load boxes of type "calendar": ' + err);
                    return;
                }

                calendarBoxes.forEach(function(box) {
                    if (!box.data.url)
                        return;

                    calendarParser.parseFromUrl(box.data.url, function(e, events) {
                        if (e) {
                            sails.log.error('Failed to parse calendar URL: ' + e);
                            return;
                        }

                        box.data.events = events;
                        box.save(function(e) {
                            if (e) {
                                sails.log.error('Failed to save updated calendar events for url: ' + box.data.url);
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
    },

    {
        name: "RSS poller",
        on: {
            minute: [0, 10, 20, 30, 40, 50]
        },
        run: function (sails) {
            sails.models.box.findByType('rss').exec(function(err, rssBoxes) {
                if (err) {
                    sails.log.error('Failed to load boxes of type "rss": ' + err);
                    return;
                }

                rssBoxes.forEach(function(box) {
                    if (!box.data.url)
                        return;

                    rssParser.parseFromUrl(box.data.url, function(e, articles) {
                        if (e) {
                            sails.log.error('Failed to parse rss URL: ' + e);
                            return;
                        }

                        box.data.articles = articles;
                        box.save(function(e) {
                            if (e) {
                                sails.log.error('Failed to save updated rss articles for url: ' + box.data.url);
                                return;
                            }
                            // Inform all clients about the updated rss data.
                            // It's not needed as the data will be reloaded with
                            // every page change but we do it anyway - because we can ;-)
                            sails.models.box.publishUpdate(box.id);
                        });
                    });
                });

                sails.log('Reloaded rss data of ' + rssBoxes.length + ' rss boxes.');
            });
        }
    }
]
