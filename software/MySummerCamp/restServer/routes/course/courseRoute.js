/**
 * Created by purushotham on 22/3/17.
 */
var mongoose=require('mongoose');
var course=require('../../models/course/course');
var coursesslot=require('../../models/courseSlot/courseSlot');
var SuccessResponse =require('../../models/successResponse/SuccessResponse');
var ErrorResult =require('../../models/errorResult/ErrorResult');
var appUtils=require('../../utils/app.utils')
var Q=require('q');
//var Student=require('../../models/Student/student');
var coursesRoute= {
    createCourse: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var eachCourse = {};
        var newCourse = {};
        newCourse.courseSlot = [];
        queryParam.slot.forEach(function(slotObj, slotIndex){
            var deffered = Q.defer();;
            var eachSlot=appUtils.getCourseSlotObj(slotObj.timeSlot.label,queryParam.course.noOfStudents,queryParam.course.availableSlots)
            var newCourseSlot = new coursesslot(eachSlot);
            newCourseSlot.save(function (err, Slot) {
                if (err) {
                    deffered.reject(err);
                    res.send(err);
                }
                else{
                    newCourse.courseSlot.push(Slot._id);
                    if(slotIndex == queryParam.slot.length-1){
                        newCourse=appUtils.getCourseObj(queryParam);
                        var newCourseObj = new course(newCourse)
                        newCourseObj.save(function (err1, response) {
                            if (err1) {
                                return res.json(new ErrorResult("failed",'cannot create course',[{'msg' : 'error'}]))
                            }
                            else {
                                res.send(new SuccessResponse("ok", '', '', 'success'))
                            }
                        });
                    }
                }
            });
        });
    },
    getCourses: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        course.find({}).populate('courseSlot').sort(queryParam.sortingCriteria).skip(queryParam.page).limit(queryParam.page_size).exec(function (err, response) {
            if (err) {
                return res.json(new ErrorResult("failed", "data not found", [{'msg': 'error message'}]));
            }
            else {
                course.find({}).count().exec(function (err, result) {
                    if (err) {
                        return res.json(new ErrorResult("failed", "data not found", [{'msg': 'error message'}]));
                    }
                    else {
                        var courses = [];
                        for (var i = 0; i < response.length; i++) {
                            var courseList = {};
                            var eachCourse = response[i];
                            courseList=appUtils.getListOfCourses(eachCourse);
                            courses.push(courseList);
                            var pagination = {};
                            pagination.total = result;

                        }
                        res.send(new SuccessResponse("ok", courses, pagination, 'success'));
                    }

                });
            }

        });
    }
}
module.exports=coursesRoute;