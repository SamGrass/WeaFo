angular.module('WeaFo').controller('weatherTableController',  ['wService', '$uibModal', '$scope', function(wService,  $uibModal, $scope) {
    const wt = this;
    wt.isFavorite = wService.isFavorite;
    wt.toggleFavorite = function(city) {
        if (wt.isFavorite(city)){
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
}])