/**
 * Box.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    page: {
      model: 'page'
    },
    type: {
      type: 'string',
      enum: [
        'html',
        'iframe',
        'video',
        'video-stream',
        'calendar',
        'images',
        'map',
        'clock-analog',
        'clock-digital',
        'weather'
      ]
    },
    width: {
      type: 'integer'
    },
    height: {
      type: 'integer'
    },
    top: {
      type: 'integer'
    },
    left: {
      type: 'integer'
    },
    scale: {
      type: 'float',
      defaultsTo: 1.0
    },
    data: {
      type: 'json'
    }
  },
  beforeUpdate: function(valuesToUpdate, cb) {
    cb();
  },
  afterUpdate: function(updatedRecord, cb) {
    cb();
  },
  beforeDestroy: function(criteria, cb) {
    cb();
  }
};

