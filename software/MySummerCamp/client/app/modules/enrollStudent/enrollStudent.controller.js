/**
 * Created by purushotham on 23/3/17.
 */

(function() {
    'use strict';
    angular.module("MSC.enroll")
        .controller("enrollCtrl",enrollCtrl);
    enrollCtrl.$inject=['$localStorage','courseService','$stateParams','studentService']
    function enrollCtrl($localStorage,courseService,$stateParams,studentService){
        var vm=this;
        console.log($localStorage.courseDetails )
        vm.student={}
        vm.student.course=$localStorage.courseDetails[$stateParams.id].name;
        vm.id=$localStorage.courseDetails[$stateParams.id].id
        vm.exists=false;
        console.log($localStorage.courseDetails[$stateParams.id]);
        vm.course={}
        vm.course=$localStorage.courseDetails[$stateParams.id];
        vm.courseSlot={
            id:[],
            timeSlot: [],
            availableSlots :[],
            noOfStudents :[]
        };
        angular.forEach(vm.course.courseSlot,function(slot,index){
            console.log(slot)
            vm.courseSlot.id.push(slot._id)
            vm.courseSlot.timeSlot.push(slot.timeSlot)
            vm.courseSlot.noOfStudents.push(slot.noOfStudents);
            vm.courseSlot.availableSlots.push(slot.availableSlots);
        });
        console.log(vm.courseSlot)

        function enrollStudent(student,id){
            console.log(student,id)
            var query={};
            query.student=student;
            query.id=id;
            studentService.enrollStudent(query).then(function(response) {
                    console.log(response)
                
                },
                function(failure){
                    console.log("failed")
                });
        }
        vm.submit=function(){
            console.log(vm.student);
            enrollStudent(vm.student,vm.id);
        }
        vm.checkmail=function(email) {
            console.log("In check mail")

            studentService.checkMail(email).then(
                function (response) {
                    console.log(response)
                    if (response.messages == "email exists")
                        vm.exists = true;
                    else
                        vm.exists = false;
                },
                function (failure) {
                    console.log("failed")
                });

        }
        vm.studentSlotObject=function(id){
            vm.student.slotId=id;
            console.log(vm.student.slotId)
        }
    }
}());