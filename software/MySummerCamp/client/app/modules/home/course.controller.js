/**
 * Created by purushotham on 22/3/17.
 */
/**
 * Created by purushotham on 10/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.home')
        .controller("courseCtrl",courseCtrl);
    courseCtrl.$inject=['$uibModalInstance','courseService','slotData']
    function courseCtrl(uibModalInstance,courseService,slotData){
        var vm=this;/*
        vm.course={}
        vm.course.timeslots={
            timeslot1 : vm.obj.timeSlots[0],
            timeslot2 : vm.obj.timeSlots[1],
            timeslot3 : vm.obj.timeSlots[2]
        },
            vm.course.students=*/
        loadSlots();
        function loadSlots() {
            slotData.getData().then(
                function(response){
                    console.log(response.CourseSlot);
                        vm.timeSlots=[],
                        vm.Students = [],
                        vm.availableSlots = []
                    angular.forEach(response.CourseSlot,function(each){
                        vm.timeSlots.push(each.timeSlot)
                        vm.Students.push(each.noOfStudents)
                        vm.availableSlots.push(each.availableSlots)
                    })
                },
            function (failed){
                
            }
        );
        }
        /*vm.id=id;
         vm.address={};
         console.log(vm.address);
         console.log(id)
         */

        function createCourse(obj){
            console.log(obj);
            var query={}
            query=obj;
            courseService.createCourse(query).then(
                function success(response) {
                    vm.success = response;
                },
                function failed(error) {
                }
            );
        }
        vm.submit = function () {
            if(vm.courseForm.$valid) {
                createCourse(vm.course);
                uibModalInstance.close();
            }
            else{
                vm.exists=false;
            }

        };
        vm.cancel = function () {
            uibModalInstance.dismiss('cancel');
        };

    }
}());

