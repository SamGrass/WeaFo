angular.module('WeaFo').controller('cityDetailsController', ['$routeParams', 'weatherService', function($routeParams, weatherService) {
    const cd = this;
    cd.cityData = {};

    weatherService.getCityFromName($routeParams.city)
        .then(function (res) {
            cd.cityData = new City(res.data);
            console.log(cd.cityData);
        })
        .catch(function (err) {
            console.log(err.message);
        })

}])