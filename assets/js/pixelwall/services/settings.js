angular.module('PixelWall')
.service(
  'settings',
  [
    '$q',
    'settingFactory',
    function(
      $q,
      settingFactory
    ) {
      var settings = {
        identity: {
          organization: "ACME",
          homepage: "https://example.com"
        },
        alerts: "default alert",
        proxy: {
          enabled: true,
          patterns: []
        },
        authentication: {
          local: {},
          ldap: {}
        }
      };
      this.fetch = function(name) {
        deferred = $q.defer();
        settingFactory.get({name: name}).$promise.then(function(data) {
          deferred.resolve(data);
        }).catch(function(err) {
          if (settings.hasOwnProperty(name)) {
            deferred.resolve(
              new settingFactory({
                name: name,
                value: settings[name]
              })
            );
          } else {
            deferred.reject('Setting ' + name + ' not found: ' + err);
          }
        });
        return deferred.promise;
      };
    }
  ]
);
