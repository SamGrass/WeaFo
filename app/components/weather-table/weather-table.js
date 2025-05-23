angular.module('WeaFo').component('weatherTable', {
    templateUrl: 'app/components/weather-table/weather-table.html',
    controller: 'weatherTableController',
    controllerAs: 'wt',
    bindings: {
        cityDataList: '=',
        iconUrl: '<',
        cityDetails: '&',
        tableLimit: '@?',
    }
})