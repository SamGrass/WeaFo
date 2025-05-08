angular.module('WeaFo').controller('homeController', ['$location', 'wService', function ($location, wService) {

    const home = this;
    home.iconUrl = wService.getIconBaseUrl();
    home.cityDataList = [];
    home.cities = ["London", "Tokyo", "New York", "Paris", "Milan", "Sydney", "Cairo", "Rio de Janeiro", "Toronto", "Berlin"];


    angular.forEach(home.cities, function (city) {
        wService.getCityFromName(city).then(function (res) {
            let cityData = new City(res.data);
            home.cityDataList.push(cityData);
            console.log(cityData);
        }).catch(function (err) {
            console.log(err.message);
        })
    })

    home.onDetails = function (city) {
        $location.path(`/city-details/${city}`);
    }
}]);
