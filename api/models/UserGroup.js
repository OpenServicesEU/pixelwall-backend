/**
* UserGroup.js
*
* @description :: Joining users and groups.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    user: {
      model: 'user'
    },
    group: {
      model: 'group'
    }
  }
};

