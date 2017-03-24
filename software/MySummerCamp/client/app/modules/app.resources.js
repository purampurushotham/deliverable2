/**
 * Created by purushotham on 22/3/17.
 */
/**
 * Created by purushotham on 20/3/17.
 */
/**
 * Created by purushotham on 2/3/17.
 */
(function() {
    'use strict';

    angular.module('MSC')

        .factory('api', api);

    api.$inject = ['$resource', '$rootScope'];

    function api ($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }
    var getParamDefaults = function () {
        return {
            id : '@id'
        };
    };
    var getActions = function() {
        return {
            'createCourse': {
                method: "POST",
                url: "/api/v1.0/createCourse"
            },
            'getCourses' : {
                method: "GET",
                url: "/api/v1.0/getCourses"
            },
            'checkMail' : {
                method : "GET",
                url : "/api/v1.0/checkMail"
            },
            'enrollStudent' : {
                method : 'POST',
                url : "/api/v1.0/enrollStudent"
            }
        }
    }
}());