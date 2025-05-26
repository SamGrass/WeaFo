angular.module('WeaFo').controller('contactUsController',  ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    $scope.user = {
        email: '',
        subject: '',
        description: '',
    };
    $scope.isSent  = false;

    $scope.submit = function(form) {
        if (form.$invalid) {
            $scope.isSent  = false;
            form.$setSubmitted();
            console.log('Form is invalid. Please check the fields.');
        } else {
            const data = JSON.stringify($scope.user);
            console.log('Form is valid. Submitting data:', data);
        //     add logic to send data to backend
            $scope.isSent  = true;
            $timeout(function() {
                $location.path('/')
            }, 4000)

        }
    };

    $scope.reset = function(form) {
        $scope.isSent  = false;
        $scope.user = {};
        if (form){
            form.$setPristine();
            form.$setUntouched();
            form.$submitted = false;
            console.log(form.$submitted);
        }

        console.log('reset')
    };

    $scope.reset();
}])