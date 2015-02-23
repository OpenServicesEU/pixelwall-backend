angular.module("PixelWall")
.factory("uiRouterConsole", ["$rootScope", function ($rootScope) {
    var handler = { active: false };
    handler.toggle = function () { handler.active = !handler.active; };
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (handler.active) {
            console.log("$stateChangeStart --- event, toState, toParams, fromState, fromParams");
            console.log(arguments);
        };
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (handler.active) {
            console.log("$stateChangeError --- event, toState, toParams, fromState, fromParams, error");
            console.log(arguments);
        };
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (handler.active) {
            console.log("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams");
            console.log(arguments);
        };
    });
    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        if (handler.active) {
            console.log("$viewContentLoading --- event, viewConfig");
            console.log(arguments);
        };
    });
    $rootScope.$on('$viewContentLoaded', function (event) {
        if (handler.active) {
            console.log("$viewContentLoaded --- event");
            console.log(arguments);
        };
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        if (handler.active) {
            console.log("$stateNotFound --- event, unfoundState, fromState, fromParams");
            console.log(arguments);
        };
    });
    return handler;
}]);
