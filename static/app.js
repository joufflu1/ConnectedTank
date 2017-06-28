var app = angular.module('justgageDemoApp', ['ngSocket', 'frapontillo.gage', 'ui.bootstrap']);

app.controller('MainCtrl', ['$scope', '$socket', '$http', 'myService', 'fcm', '$interval', function ($scope, $socket, $http, myService, fcm, $interval) {
    $scope.title = 'Tank Level';
    $scope.titleFontColor = 'green';
    $scope.value = 90;
    $scope.valueFontColor = 'green';
    $scope.min = 0;
    $scope.max = 100;
    $scope.valueMinFontSize = undefined;
    $scope.titleMinFontSize = undefined;
    $scope.labelMinFontSize = undefined;
    $scope.minLabelMinFontSize = undefined;
    $scope.maxLabelMinFontSize = undefined;
    $scope.hideValue = false;
    $scope.hideMinMax = false;
    $scope.hideInnerShadow = false;
    $scope.width = undefined;
    $scope.height = undefined;
    $scope.relativeGaugeSize = undefined;
    $scope.gaugeWidthScale = 0.5;
    $scope.gaugeColor = 'grey';
    $scope.showInnerShadow = true;
    $scope.shadowOpacity = 0.5;
    $scope.shadowSize = 3;
    $scope.shadowVerticalOffset = 10;
    $scope.levelColors = ['#00FFF2', '#668C54', '#FFAF2E', '#FF2EF1'];
    $scope.customSectors = [
        {
            color: "#ff0000",
            lo: 0,
            hi: 25
        },
        {
            color: "#ff9933",
            lo: 25,
            hi: 50
        },
        {
            color: "#ccff33",
            lo: 50,
            hi: 75
        },
        {
            color: "#33CC33",
            lo: 75,
            hi: 100
        }
    ];
    $scope.noGradient = false;
    $scope.label = '%';
    $scope.labelFontColor = 'green';
    $scope.startAnimationTime = 0;
    $scope.startAnimationType = undefined;
    $scope.refreshAnimationTime = undefined;
    $scope.refreshAnimationType = undefined;
    $scope.donut = undefined;
    $scope.donutAngle = 90;
    $scope.counter = true;
    $scope.decimals = 2;
    $scope.symbol = 'X';
    $scope.formatNumber = true;
    $scope.humanFriendly = true;
    $scope.humanFriendlyDecimal = true;
    $scope.textRenderer = function (value) {
        return value;
    };


    $socket.on('level', $scope, function (json) {
        console.log('level ' + json.niveau);
        if (json.niveau < 50) {
            $scope.showAlert = true;
        } else {
            $scope.showAlert = false;
        }
        $scope.value = Math.round(json.niveau);
    });

    $scope.text = 'Il pleut ? ';
    $scope.showAlert = null;
    $scope.alertType = "danger";
    $scope.alertMessage = "Danger! Des precipitation sont à prevoir. Il est recommandé de vider votre Cuve";

    myService.async("2971117").then(function (d) {
        $scope.rain = d + " %";
    });

    // Alert: Des precipitation sont a prevoir. Il est recommandé de vider votre Cuve
    $interval(function () {
        $scope.rain = "100 %";
        $scope.showAlert = true;
        fcm.sendNoti("ALERT RAIN", true);
        // Refresh every 10 second
    }, 30000);

    $scope.removeAlert = function () {
        $scope.showAlert = false;
    }

}]);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.factory('fcm', function ($http) {
    var myService = {
        sendNoti: function (message, isNotification) {
            var apiKey = "key=TODO",
                deviceId = "TODO",
                action = {"to": deviceId, "notification": {"title": "Connected Tank Alert", "body": message}};

            if (!isNotification) {
                action = {"to": deviceId, "data": {"message": message}};
            }

            return $http({
                url: 'https://fcm.googleapis.com/fcm/send',
                method: "POST",
                headers: {'Content-Type': 'application/json', 'Authorization': apiKey},
                data: JSON.stringify(action),
                async: true
            })
                .then(function successCallback(response) {
                    return "";
                }, function errorCallback(response) {
                    return "";
                });
        }
    };
    return myService;
});

app.factory('myService', function ($http) {
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
