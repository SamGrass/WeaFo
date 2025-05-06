angular.module('WeaFo')
    .service('weatherService', ['$http', function ($http) {
        var apiKey = '4cd6fd8911f6e75c9afc398da4ee0de5';
        var baseUrl = 'https://api.openweathermap.org/';
        var iconBaseUrl = 'https://openweathermap.org/img/wn/';
        var weatherService = {};

        weatherService.getCityFromName = function (city) {
            return $http({
                method: 'GET',
                url: `${baseUrl}data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
            });
        };

        weatherService.getIconBaseUrl = function () {
            return iconBaseUrl;
        }
        return weatherService;

    }])
