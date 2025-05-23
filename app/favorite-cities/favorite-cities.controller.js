angular.module('WeaFo').controller('favoriteCitiesController', ['$location', 'wService', '$scope', function ($location, wService, $scope) {
    var fc = this;
    fc.iconUrl = wService.getIconBaseUrl();
    fc.favCities = wService.getFavoriteCities().slice().reverse();
    $scope.$on('favoritesUpdated', function() {
        fc.favCities = wService.getFavoriteCities().slice().reverse()
    });
    console.log(fc.favCities);

    $scope.$watch(function() { return fc.favCities; }, function(newVal, oldVal) {
        console.log(oldVal);
        console.log(newVal);
        if (newVal.length === 0) {
            $location.path(`/`);
        }
    })
    fc.onDetails = function (city) {
        $location.path(`/city-details/${city}`);
    }
}])