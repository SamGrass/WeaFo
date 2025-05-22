angular.module('WeaFo').controller('dayTableController',  ['wService', '$uibModalInstance', 'resolvedForecastItems', function(wService, $uibModalInstance, resolvedForecastItems) {
    const dt = this;
    dt.iconUrl = wService.getIconBaseUrl();
    dt.forecastList = resolvedForecastItems;

    dt.closeTable = function () {
        $uibModalInstance.close('cancel');
    };
}])