angular.module('WeaFo').controller('homeController', ['weatherService', function (weatherService) {
    var home = this;
    home.title = 'Home';
    home.city = {};

    /*weatherService.getCityFromCord(46.069, 13.232)
    .then(function (res) {
        home.city = res.data;
        console.log(home.city);
    })*/

    weatherService.getCityFromName('Udine').then(function (res) {
        home.city = res.data;
    }).catch(function (err) {
        console.log(err.message);
    })
}]);
