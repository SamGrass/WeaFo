angular.module('WeaFo').controller('cityDetailsController', ['$routeParams', 'wService', '$uibModal', function($routeParams, wService, $uibModal) {
    const cd = this;
    cd.iconUrl = wService.getIconBaseUrl();
    cd.cityData = {};
    cd.now = {};
    cd.toggleFavorite = wService.toggleFavorite;
    cd.isFavorite = wService.isFavorite;
    wService.getCityFromName($routeParams.city)
        .then(function (res) {
            cd.cityData = new City(res.data);
            cd.now = cd.cityData.forecastList[0];
        })
        .catch(function (err) {
            console.log(err.message);
        })

    // function to call the modal day-table based on the day clicked
    cd.openForecastModal = function (dailyDay, forecast) {
        cd.dailyForecastList = [];
        forecast.forEach(function (forecast) {
            if (forecast.time === dailyDay) {
                cd.dailyForecastList.push(forecast);
            }
        })
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/day-table/day-table.html',
            controller: 'dayTableController',
            controllerAs: 'dt',
            size: 'lg',
            resolve: {
                resolvedForecastItems: function () {
                    return cd.dailyForecastList;
                },
            }
        })

        modalInstance.result
            .then(function (resultFromModal) {
                console.log('Modal closed with result: ' + resultFromModal + ' at: ' + new Date());
            })
            .catch(function (resultFromModal) {
                console.log('Modal closed with result: ' + resultFromModal + ' at: ' + new Date());
            })
    }

}])
