'use strict';
var levelApp = angular.module ('levelApp', ['ngSocket']);


levelApp.config(["$socketProvider", function ($socketProvider) {
  $socketProvider.setUrl("http://192.168.42.1:5000");
}]);

levelApp.config(function ($interpolateProvider) {  
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
 
levelApp.controller('levelController', ['$scope', '$socket', function($scope, $socket) {
    $scope.level = 100;


 
$socket.on ('level', $scope, function (json) {
    console.log ('level ' + json.niveau);
    $scope.level = json.niveau;
    
});
}]);

