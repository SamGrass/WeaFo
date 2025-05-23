angular.module('WeaFo').controller('homeController', ['$location', '$q', 'wService', '$scope', function ($location, $q, wService, $scope) {

    const home = this;
    home.iconUrl = wService.getIconBaseUrl();
    home.cityDataList = [];
    home.favCities = wService.getFavoriteCities().slice().reverse();
    $scope.$on('favoritesUpdated', function() {
        home.favCities = wService.getFavoriteCities().slice().reverse()
    });

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
