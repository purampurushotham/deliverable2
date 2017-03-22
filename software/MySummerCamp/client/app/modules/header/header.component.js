/**
 * Created by purushotham on 22/3/17.
 */
(function () {
    'use strict';
    angular.module('MSC.header')
        .component('headerComponent',{
            templateUrl : "app/partials/header.html",
            controller : headerCtrl,
            controllerAs : "hc"
        });
    headerCtrl.$inject=['slotData']
    function headerCtrl(slotData) {
        var vm=this;
        slotData.getData().then(
            function (Success) {

            },
            function (failed) {

            }
        );
    }
})();
