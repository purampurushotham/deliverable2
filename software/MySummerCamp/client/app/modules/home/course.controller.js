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
        var vm=this;
        vm.newObject=[]
        vm.timeSlots=[],
            loadSlots();
        vm.course={};
        vm.course.slots= {
            timeSlotModel :[]
        };
        function loadSlots() {
            slotData.getData().then(
                function(response){
                    loadTimeSlots(response)

                },
                function (failed){

                }
            );
        }
        var loadObjects=function (){
            for(var i=0;i<vm.course.slots.timeSlotModel.length;i++){
                var obj={};
                obj.timeSlot=vm.course.slots.timeSlotModel[i];
                vm.newObject.push(obj)
            }
        }
        function loadTimeSlots(result) {
            angular.forEach(result.CourseSlot, function (each) {
                var obj={}
                obj.id=result.CourseSlot.indexOf(each);
                obj.label = each.timeSlot;
                vm.timeSlots.push(obj)
            });
        }
        function createCourse(course,slot){
            var query={}
            query.course=course;
            query.slot=slot;
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
                loadObjects();
                createCourse(vm.course,vm.newObject);
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

