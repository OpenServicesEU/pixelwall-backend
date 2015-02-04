/**
 * schedule hook
 */

module.exports = function (sails) {
    /**
     * Module dependencies.
     */

    var schedule = require('node-schedule');

    /**
     * Expose hook definition
     */

    return {
        initialize: function (next) {
            sails.after('hook:orm:loaded', function () {
                sails.config.crontab.forEach(function(job) {
                    sails.log.info('Registering job: ' + job.name);
                    schedule.scheduleJob(
                        job.on,
                        function() {
                            try {
                                job.run(sails);
                            } catch(e) {
                                sails.log.error(e.name + ': ' + e.message);
                            }
                        }
                    );
                });
            });
            return next();
        }
    };
};
