/**
 * Created by purushotham on 22/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC')
        .factory('courseService', courseService);
    courseService.$inject = ['api', '$q'];
    function courseService(api, q) {
    var setOfServices={
        createCourse : createCourse,
        getCourses : getCourses
    }
        return setOfServices;
        function createCourse(q){
            var query=q;
            console.log(query.course)
            return api.createCourse({q : query}).$promise
        }
        function getCourses(q){
            var query =q;
            console.log("************ courseService)&&&&&&&&&&&&&&&")
            console.log(query)
            return api.getCourses({q : query}).$promise
        }
      
    }
}());
