angular.module('PixelWall')
.controller('BackendSettingsController', [
  '$scope',
  'settings',
  function (
    $scope,
    settings
  ) {
    settings.fetch('proxy').then(function(setting) {
      var proxy = {
        setting: setting,
        addPattern: function() {
          if (proxy.setting.value.patterns.indexOf(proxy.pattern) < 0) {
            proxy.setting.value.patterns.push(proxy.pattern);
          }
        },
        removePattern: function($index) {
          proxy.setting.value.patterns.splice($index, 1);
        },
        save: function() {
          proxy.$save();
        },
        toggle: function() {
          proxy.setting.value.enabled = !proxy.setting.value.enabled;
        }
      };
      $scope.proxy = proxy;
    });
  }
]);
