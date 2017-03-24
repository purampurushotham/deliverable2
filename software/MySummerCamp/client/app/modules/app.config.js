/**
 * Created by purushotham on 22/3/17.
 */
(function() {
    'use strict';
    angular
        .module('MSC')
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        console.log("in app.config")
        $urlRouterProvider.otherwise("Home");
        $stateProvider
            .state("Home", {
                url: "/Home",
                templateUrl: "app/partials/home.html",
            })
            .state('enroll',{
               url :"/enroll/:id",
                templateUrl : "app/partials/enrollStudent.html",
                controller : "enrollCtrl",
                controllerAs : "ec"
            });
    }
}());