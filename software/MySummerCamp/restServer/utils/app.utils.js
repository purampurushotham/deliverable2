/**
 * Created by purushotham on 24/3/17.
 */
var mongoose=require('mongoose');
var appUtils={
    getQueryParams : function(req){
        return (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    },
    getCourseSlotObj : function(timeSlot,noOfStudents,availableSlots){
        var eachSlot = {};
        eachSlot.timeSlot=timeSlot;
        eachSlot.noOfStudents=noOfStudents;
        eachSlot.availableSlots=availableSlots;
        return eachSlot;
    },
    
    getStudentObj : function (query) {
      var student ={}
        student.course=query.course;
        student.firstName=query.firstName;
        student.lastName=query.lastName;
        student.email=query.email;
        student.timeSlot=query.timeSlot;
        return student;
    },
    getCourseObj : function(query){
        var newCourse={};
        newCourse.name = query.course.name;
        newCourse.description = query.course.description;
        newCourse.duration = query.course.duration;
        newCourse.noOfDays = query.course.noOfDays;
        newCourse.coach = query.course.coach;
        newCourse.fee = query.course.fee;
        return newCourse;
    },
    getListOfCourses :function(query){
        var eachCourse={}
        eachCourse.name = query.name;
        eachCourse.description = query.description;
        eachCourse.duration = query.duration;
        eachCourse.noOfDays = query.noOfDays;
        eachCourse.coach = query.coach;
        eachCourse.fee = query.fee.value;
        eachCourse.id=query._id;
        eachCourse.courseSlot=[];
        query.courseSlot.forEach(function(slot){
            eachCourse.courseSlot.push(slot)
        });
        return eachCourse;
    }
}
module.exports=appUtils;