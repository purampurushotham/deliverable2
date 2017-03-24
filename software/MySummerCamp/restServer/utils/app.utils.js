/**
 * Created by purushotham on 24/3/17.
 */
var mongoose=require('mongoose');
var appUtils={
    getQueryParams : function(req){
        return (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    },
    getStudentObj : function (query) {
      var student ={}
        student.course=query.course;
        student.firstName=query.firstName;
        student.lastName=query.lastName;
        student.email=query.email;
        student.timeSlot=query.timeSlot;
        return student;
    } 
}
module.exports=appUtils;