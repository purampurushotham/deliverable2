/**
 * Created by purushotham on 22/3/17.
 */
(function(){
    angular
        .module("MSC")
        .run(appRun);
    appRun.$inject = ['$rootScope'];
    function appRun($rootScope) {
        console.log("in app.run");
    }
}());
