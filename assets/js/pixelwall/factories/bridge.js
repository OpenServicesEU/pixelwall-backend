angular.module('PixelWall')
.factory('bridgeFactory', function() {
  return {
    listen: function(bridge, signal, callback) {
      if (window.hasOwnProperty(bridge)) {
        window[bridge]['on_' + signal].connect(callback);
      }
    },
    send: function(bridge, slot, data) {
      if (window.hasOwnProperty(bridge)) {
        window[bridge][slot](JSON.stringify(data));
      }
    }
  };
});
