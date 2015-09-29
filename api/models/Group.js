/**
* Group.js
*
* @description :: A set of users that can grant access to a device.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    enabled: {
      type: 'boolean',
      defaultsTo: true
    },
    users: {
      collection: 'usergroup',
      via: 'group'
    },
    devices: {
      collection: 'devicegroup',
      via: 'group'
    }
  }
};

