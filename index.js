"use strict";
var WeaFo = angular.module('WeaFo', ["ngRoute", "ngAnimate", "ui.bootstrap"])
        .config(function ($routeProvider, $httpProvider) {
                $httpProvider.interceptors.push('myInterceptor')

                $routeProvider
                    .when('/', {
                        template: "<home></home>",
                    })
                    .when('/favorite-cities', {
                        template: "<favorite-cities></favorite-cities>",
                        resolve: {
                            auth: ['$location', function ($location) {
                                if (JSON.parse(localStorage.getItem('favCities')).length < 1) {
                                    $location.path('/')
                                }
                            }]
                        }
                    })
                    .when('/error', {
                        template: "<error></error>"
                    })
                    .when('/city-details/:city', {
                        template: "<city-details></city-details>"
                    })
                    .otherwise({ redirectTo: '/error'})
        })
