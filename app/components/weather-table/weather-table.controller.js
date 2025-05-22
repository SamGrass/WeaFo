angular.module('WeaFo').controller('weatherTableController',  ['wService', function(wService) {
    const wt = this;
    wt.isFavorite = wService.isFavorite;
    wt.toggleFavorite = wService.toggleFavorite;

}])