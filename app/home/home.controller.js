angular.module('WeaFo').controller('homeController', ['weatherService', function (weatherService) {
    console.log('homeController');
    var home = this;
    home.title = 'Home';
    home.city = {};

    weatherService.getCity(46.069, 13.232)
    .then(function (res) {
        home.city = res;
        console.log(home.city);
    })


}]);
