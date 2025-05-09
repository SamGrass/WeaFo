angular.module('WeaFo').controller('dayTableController', ['wService', function(wService) {
    const dt = this;
    dt.iconUrl = wService.getIconBaseUrl();

}])