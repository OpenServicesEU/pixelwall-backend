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
        'rss'
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
  }
};

