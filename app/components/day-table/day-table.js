angular.module('WeaFo').component('dayTable', {
    templateUrl: 'app/components/day-table/day-table.html',
    controller: 'dayTableController',
    controllerAs: 'dt',
    bindings: {
        forecastList: '<',
        closeTable: '&'
    }
})