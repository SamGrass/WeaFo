angular.module('WeaFo')
    .factory('weatherService', ['$http', function ($http) {
        var apiKey = '4cd6fd8911f6e75c9afc398da4ee0de5';
        var weatherService = {};

        weatherService.getCityFromCord = function (lat, lon) {
            return $http({
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            });
        };

        weatherService.getCityFromName = function (city) {
            return $http({
                method: 'GET',
                url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
            }).then(function (res){
                if (res.data.length === 0) {
                    return console.log('City not found');
                }
                var lat = res.data[0].lat;
                var lon = res.data[0].lon;
                return  weatherService.getCityFromCord(lat, lon);
            });
        }
        return weatherService;

    }])
