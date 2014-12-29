(function(ng){
	function run ($rootScope) {
		$rootScope.angularApp = "Angular application  done."
	};
	ng.module('app', [])
		.run(run)
})(angular)
