angular.module('WeaFo').controller('confirmModalController',  ['wService', '$uibModalInstance', 'modalData', function(wService, $uibModalInstance, modalData) {
    const cm = this;
    cm.iconUrl = wService.getIconBaseUrl();
    cm.modalData = modalData;

    cm.ok = function () {
        $uibModalInstance.close(true);
    };

    cm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}])