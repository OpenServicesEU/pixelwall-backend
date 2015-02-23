/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


var defaultBluePrintPolicy = {
    create: ['passport', 'sessionAuth'],
    update: ['passport', 'sessionAuth'],
    destroy: ['passport', 'sessionAuth'],
    add: ['passport', 'sessionAuth'],
    remove: ['passport', 'sessionAuth']
};
var defaultUploadPolicy = {
    upload: ['passport', 'sessionAuth']
};

module.exports.policies = {

    //'*': true
    '*': [ 'passport' ],

    //DeviceController: defaultBluePrintPolicy,
    //PageController: defaultBluePrintPolicy,
    //BoxController: defaultBluePrintPolicy,

    //ImagesController: defaultUploadPolicy,
    //VideoController: defaultUploadPolicy
};
