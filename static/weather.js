var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('WeatCtrl', ['$scope', '$http', 'myService', 'fcm', '$interval', function ($scope, $http, myService, fcm, $interval) {
    $scope.text = 'Il pleut ? ';
    $scope.showAlert = null;
    $scope.alertType = "danger";
    $scope.alertMessage = "Alert: Des precipitation sont à prevoir. Il est recommandé de vider votre Cuve";

    myService.async("2971117").then(function (d) {
        $scope.rain = d + " %";
    });

    // Alert: Des precipitation sont a prevoir. Il est recommandé de vider votre Cuve

    $interval(function () {
        $scope.rain = "100 %";
        $scope.showAlert = true;
        fcm.sendNoti("ALERT RAIN", true);
        // Refresh every 10 second
    }, 10000);

    $scope.removeAlert = function () {
        $scope.showAlert = false;
    }

}]);

myApp.factory('myService', function ($http) {
    var myService = {
        async: function (city) {
            return $http({
                method: 'GET',
                url: "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + city + "&cnt=5&appid=ccc8240263784ad9f41414174c20d05a"
            })
                .then(function successCallback(response) {
                    return response.data.list[0].humidity;
                }, function errorCallback(response) {
                    return response.cod;
                });
        }
    };
    return myService;
});


