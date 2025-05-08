angular.module('WeaFo').controller('cityDetailsController', ['$routeParams', 'wService', function($routeParams, wService) {
    const cd = this;
    cd.cityData = {};

    wService.getCityFromName($routeParams.city)
        .then(function (res) {
            cd.cityData = new City(res.data);
            console.log(cd.cityData);
        })
        .catch(function (err) {
            console.log(err.message);
        })

}])