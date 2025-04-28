var WeaFo = angular.module('WeaFo', ["ngRoute"])
        .config(function ($routeProvider){
                $routeProvider
                    .when('/', {
                        template: "<home></home>",
                    })
                    .when('/map', {
                        template: "<map></map>"
                    })
                    .when('/city', {
                        template: "<city></city>"
                    })
                    .otherwise({ redirectTo: '/'})
        });
