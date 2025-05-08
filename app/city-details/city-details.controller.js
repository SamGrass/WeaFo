angular.module('WeaFo').controller('cityDetailsController', ['$routeParams', 'wService', function($routeParams, wService) {
    const cd = this;
    cd.iconUrl = wService.getIconBaseUrl();
    cd.cityData = {};
    cd.now = {};

    wService.getCityFromName($routeParams.city)
        .then(function (res) {
            cd.cityData = new City(res.data);
            cd.now = cd.cityData.forecastList[0];
            console.log(cd.cityData);
        })
        .catch(function (err) {
            console.log(err.message);
        })

}])