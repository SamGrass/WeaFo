angular.module('WeaFo')
    .service('weatherService', ['$http', function ($http) {
        const apiKey = '4cd6fd8911f6e75c9afc398da4ee0de5';
        const baseUrl = 'https://api.openweathermap.org/';
        const iconBaseUrl = 'https://openweathermap.org/img/wn/';

        return weatherService = {
            getCityFromName: function (city) {
                return $http({
                    method: 'GET',
                    url: `${baseUrl}data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
                });
            },

            getIconBaseUrl: function () {
                return iconBaseUrl;
            }
        };
    }])
