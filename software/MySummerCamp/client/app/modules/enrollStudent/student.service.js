/**
 * Created by purushotham on 23/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.enroll')
        .factory('studentService',studentService    );
    studentService.$inject = ['api', '$q'];
    function studentService(api, q) {
        var setOfServices = {
            checkMail: checkMail,
            enrollStudent : enrollStudent
        };
        return setOfServices;
        function checkMail(keyword) {
            var query={}
            query.keyword=keyword;
            console.log(query)
            return api.checkMail({q: query}).$promise
        }
        function enrollStudent(q){
            var query=q;
            console.log("************ courseService)&&&&&&&&&&&&&&&")
            console.log(query)
            return api.enrollStudent({q : query}).$promise;
        }
    }
}());
