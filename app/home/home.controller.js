angular.module('WeaFo').controller('homeController', ['$location', 'weatherService', function ($location, weatherService) {

    var home = this;
    home.iconDaily = weatherService.getIconBaseUrl();
    home.cityDataList = [];
    home.cities = ["London", "Tokyo", "New York", "Paris", "Rome", "Sydney", "Cairo", "Rio de Janeiro", "Toronto", "Berlin"];


    angular.forEach(home.cities, function (city) {
        weatherService.getCityFromName(city).then(function (res) {
            var cityData = new City(res.data);
            cityData.dailyAvgTemp = cityData.getDailyAvgTemp();
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
