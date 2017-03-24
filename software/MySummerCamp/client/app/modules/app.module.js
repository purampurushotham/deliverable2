/**
 * Created by purushotham on 22/3/17.
 */
(function() {
    'use strict';
    angular.module("MSC", [
        'ui.router',
        'angular-dropdown-multiselect',
        'ngTable',
        'ngResource',
        'ngStorage',
        'ui.bootstrap',
        'MSC.header',
        'MSC.home',
        'MSC.enroll'
    ]);
}());