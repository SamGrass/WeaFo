angular.module('WeaFo').controller('homeController', ['$location', '$q', 'wService', function ($location, $q, wService) {

    const home = this;
    home.iconUrl = wService.getIconBaseUrl();
    home.cityDataList = [];
    home.favCities = JSON.parse(localStorage.getItem('favCities')) || [];
    console.log(home.favCities);
    home.removeFromFavorite = function (city) {
        wService.toggleFavorite(city);
        home.favCities = JSON.parse(localStorage.getItem('favCities')) || [];
    };
    home.cities = ["London", "Tokyo", "New York", "Paris", "Milan", "Sydney", "Cairo", "Rio de Janeiro", "Toronto", "Berlin"];
    const promises = [];

    angular.forEach(home.cities, function (city) {
        let promise = wService.getCityFromName(city).then(function (res) {
            return new City(res.data);
        })
        promises.push(promise);
    })

    $q.all(promises).then(function (res) {
        home.cityDataList = res;
    }).catch(function (err) {
        console.log(err.message);
    })


    home.onDetails = function (city) {
        $location.path(`/city-details/${city}`);
    }
}]);
