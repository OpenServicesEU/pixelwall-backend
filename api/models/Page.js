/**
 * Page.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        set: {
            model: 'pageset'
        },
        order: {
          type: 'integer'
        },
        name: {
            type: 'string'
        },
        rows: {
            type: 'integer',
            defaultsTo: 4
        },
        columns: {
            type: 'integer',
            defaultsTo: 4
        },
        boxes: {
            collection: 'box',
            via: 'page'
        },
        duration: {
            type: 'integer',
            defaultsTo: 10
        },
    }
};

