angular.module('WeaFo').controller('cityDetailsController', ['$routeParams', 'wService', '$uibModal', function($routeParams, wService, $uibModal) {
    const cd = this;
    cd.iconUrl = wService.getIconBaseUrl();
    cd.cityData = {};
    cd.now = {};
    wService.getCityFromName($routeParams.city)
        .then(function (res) {
            cd.cityData = new City(res.data);
            cd.now = cd.cityData.forecastList[0];
        })
        .catch(function (err) {
            console.log(err.message);
        })

    cd.isFavorite = wService.isFavorite;
    // function to add/remove city from favorites, calling a modal for the removal
    cd.toggleFavorite = function(city) {
        if (cd.isFavorite(city)){
            let modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/confirm-modal/confirm-modal.html',
                controller: 'confirmModalController',
                controllerAs: 'cm',
                size: 'sm',
                resolve: {
                    modalData: function () {
                        return {
                            message: `Are you sure you want to remove ${city.name} from your favorites?`,
                        }
                    }
                }
            })
            modalInstance.result
                .then(function (resultFromModal) {
                    wService.toggleFavorite(city);
                    wService.showToaster(`${city.name} removed from your favorites`, 'danger');
                    console.log('Modal closed with result: ' + resultFromModal + ' at: ' + new Date());
                })
                .catch(function (resultFromModal) {
                    console.log('Modal closed with result: ' + resultFromModal + ' at: ' + new Date());
                })
        }
        else {
            wService.toggleFavorite(city);
            wService.showToaster(`${city.name} added to your favorites`, 'success');

        }
    };


    // function to call the modal day-table based on the day clicked
    cd.openForecastModal = function (dailyDay, forecast) {
        cd.dailyForecastList = [];
        forecast.forEach(function (forecast) {
            if (forecast.time === dailyDay) {
                cd.dailyForecastList.push(forecast);
            }
        })
        let modalInstance = $uibModal.open({
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
