/**
 * Device.js
 *
 * @description :: A display device.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string'
        },
        active: {
            type: 'boolean',
            defaultsTo: true
        },
        set: {
            model: 'pageset'
        },
        groups: {
          collection: 'devicegroup',
          via: 'device'
        },
        properties: {
          type: 'json'
        }
    }
};

