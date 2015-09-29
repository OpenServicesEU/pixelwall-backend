/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').waterlocked({
    register: function(req, res) {

        var params = req.params.all();
        var criteria  = { username: params.username };

        global.waterlock.engine.findAuth(criteria , function(err, user) {

            if (err) {
                sails.error(err);
                return res.json({ msg: "Failed to find user!" });
            }

            if (user)
                return res.json({ msg: "User with the same name already exists!" });
            
            var attributes = {
                username: params.username,
                password: params.password
            }

            global.waterlock.engine.findOrCreateAuth(criteria, attributes, function(e, newUser) {
                if (e) {
                    sails.error(e);
                    return res.json({ msg: "Failed to create the new user!" });
                }

                return res.json({ msg: "User created", user: newUser });
            });
        });
    }
  
});
