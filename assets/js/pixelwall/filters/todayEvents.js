angular.module('PixelWall')
.filter('todayEvents', function() {
  return function(events) {
    return _.sortBy(
      _.filter(
        events,
        function(event) {
          var start = new Date(event.start);
          var end = new Date(event.end);
          var today = new Date();
          return start.toDateString() === today.toDateString() ||
            end.toDateString() === today.toDateString();
        }
      ),
      function(a, b) {
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      }
    );
  };
});
