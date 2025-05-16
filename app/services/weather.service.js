angular.module('WeaFo')
    .service('wService', ['$http', function ($http) {
        dayjs.extend(window.dayjs_plugin_utc);
        dayjs.extend(window.dayjs_plugin_timezone);
        const apiKey = '4cd6fd8911f6e75c9afc398da4ee0de5';
        const baseUrl = 'https://api.openweathermap.org/';
        const iconBaseUrl = 'https://openweathermap.org/img/wn/';
        let favCities = JSON.parse(localStorage.getItem('favCities')) || [];

        return {
            getCityFromName: function (city) {
                return $http({
                    method: 'GET',
                    url: `${baseUrl}data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
                });
            },

            getNameFromSearchBox: function (name) {
                return $http({
                    method: 'GET',
                    url: `${baseUrl}geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`,
                    blockLoader: true
                })
            },

            getIconBaseUrl: function () {
                return iconBaseUrl;
            },

            toggleFavorite: function (city) {
                let isStored = favCities.some(function (storedCity) {
                    return storedCity.id === city.id;
                })
                console.log(isStored);
                if (isStored) {
                    favCities = favCities.filter(function (storedCity) {
                        return storedCity.id !== city.id;
                    })
                } else {
                    favCities.push(city);
                }
                localStorage.setItem('favCities', JSON.stringify(favCities));
            }
        };
    }])
