/**
* DeviceGroup.js
*
* @description :: Joining groups and devices.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    device: {
      model: 'device'
    },
    group: {
      model: 'group'
    }

  }
};

