angular.module('WeaFo')
    .factory('weatherService', ['$http', function ($http) {
        var apiKey = '4cd6fd8911f6e75c9afc398da4ee0de5';
        var weatherService = {};

        weatherService.getCity = function (lat, lon) {
            return $http({
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            }).then(function (res) {
                return res.data;
            });
        };

        return weatherService;

    }])
