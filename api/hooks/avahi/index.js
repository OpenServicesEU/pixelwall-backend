/**
 * avahi hook
 */

var Enum = require('enum');
var DBus = require('dbus-native');

var avahi = new Enum({
  'IF_UNSPEC': -1,
  'PROTO_UNSPEC': -1,
  'PROTO_INET': 0,
  'SERVER_RUNNING': 2,
  'SERVER_COLLISION': 3
});

var defaultConfig = {
  name: "Sails.js",
  type: "_sails._tcp",
  domain: "",
  host: "",
  port: 1337
};

module.exports = function (sails) {
  process.env.DISPLAY = ':0';
  process.env.DBUS_SESSION_BUS_ADDRESS = 'unix:path=/run/dbus/system_bus_socket';
  var bus = DBus.systemBus();
  var server;
  var service;
  var group;
  var config = _.merge(defaultConfig, sails.config.avahi);

  function remove_service() {
    if (group) {
      group.Reset();
    }
  }
  function add_group() {
    if (!group) {
      server.EntryGroupNew(function(err, path) {
        if (err) {
          sails.log.error('DBus: Could not call org.freedesktop.Avahi.Server.EntryGroupNew');
          return;
        }
        service.getInterface(
          path,
          'org.freedesktop.Avahi.EntryGroup',
          function (
            err,
            newGroup
          ) {
            group = newGroup;
            add_service();
          }
        )
      });
      server.EntryGroupNew();
    } else {
      add_service();
    }
  }
  function add_service() {
    sails.log.info('Publishing service ' + config.serviceName + ' (' + config.serviceType + ') on port '+ config.port);
    group.AddService(
      avahi.IF_UNSPEC.value,
      avahi.PROTO_INET.value,
      0,
      config.name,
      config.type,
      config.domain,
      config.host,
      config.port,
      '',
      function(err) {
        if (err) {
          sails.log.error('DBus: Could not call org.freedesktop.Avahi.EntryGroup.AddService');
          return;
        }
        group.Commit();
      }
    );
  }
  function stateChanged(state) {
    if (state == avahi.SERVER_COLLISION.value) {
      remove_service();
    } else {
      add_group();
    }
  }
  return {
    // Run when sails loads-- be sure and call `next()`.
    initialize: function (next) {
      sails.log.info('Registering service with avahi over dbus');
      service = bus.getService('org.freedesktop.Avahi');
      service.getInterface(
        '/',
        'org.freedesktop.Avahi.Server',
        function(
          err,
          newServer
        ) {
          server = newServer;
          server.on('StateChanged', stateChanged);
          server.GetState(function(err, state) {
            if (err) {
              sails.log.error('DBus: Could not call org.freedesktop.Avahi.Server.GetState');
              return;
            }
            stateChanged(state);
          });
        }
      );


      return next();
    }
  };
};
