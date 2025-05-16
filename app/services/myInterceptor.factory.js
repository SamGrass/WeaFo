angular.module("WeaFo").factory("myInterceptor", ['$q', '$rootScope', '$log', '$location', function ($q, $rootScope, $log, $location) {
    var activeRequests = 0; // Counter for active requests

    $rootScope.isLoading = false;

    function showLoader() {
        if (activeRequests === 0) {
            $rootScope.isLoading = true;
        }
        activeRequests++;
    }

    function hideLoader() {
        activeRequests--;
        if (activeRequests === 0) {
            $rootScope.isLoading = false;
        }
    }

    return {
        'request' : function (config) {
            if (!config.blockLoader){
                showLoader();
            }
            return (config)
        },

        'requestError': function(rejection) {
            if (!rejection.blockLoader) {
                hideLoader();
                $location.path('/error');
            }
            $log.error('requestError: ' + rejection);
            return $q.reject(rejection);

        },

        'response': function(response) {
            if (!response.blockLoader) {
                hideLoader();
            }

            return response;
        },

        'responseError': function(rejection) {
            if (!rejection.blockLoader) {
                hideLoader();
                $location.path('/error');
            }
            $log.error('responseError: ' + rejection.data.message);
            return $q.reject(rejection);
        }
    }
}])