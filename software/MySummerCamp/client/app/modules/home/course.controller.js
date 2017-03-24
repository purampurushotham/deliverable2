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
            console.log("loadData")
            slotData.getData().then(
                function(response){
                    console.log(response.CourseSlot);
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
            console.log(vm.newObject)
        }
        function loadTimeSlots(result) {
            console.log(result)
            angular.forEach(result.CourseSlot, function (each) {
                var obj={}
                console.log(result.CourseSlot.indexOf(each))
                obj.id=result.CourseSlot.indexOf(each);
                obj.label = each.timeSlot;
                vm.timeSlots.push(obj)
            });
            console.log(vm.timeSlots)
        }
        function createCourse(course,slot){
            console.log(course);
            var query={}
            query.course=course;
            query.slot=slot;
            console.log(query)
            courseService.createCourse(query).then(
                function success(response) {
                    console.log(response)
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

