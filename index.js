"use strict";
var WeaFo = angular.module('WeaFo', ["ngRoute", "ngAnimate", "ui.bootstrap"])
        .config(function ($routeProvider){
                $routeProvider
                    .when('/', {
                        template: "<home></home>",
                    })
                    .when('/map', {
                        template: "<map></map>"
                    })
                    .when('/city-details/:city', {
                        template: "<city-details></city-details>"
                    })
                    .otherwise({ redirectTo: '/'})
        })
