angular.module('WeaFo').controller('favoriteCitiesController', ['$location', 'wService', function ($location, wService) {
    var fc = this;
    fc.iconUrl = wService.getIconBaseUrl();
    fc.favCities = wService.getFavoriteCities();
    fc.onDetails = function (city) {
        $location.path(`/city-details/${city}`);
    }
}])