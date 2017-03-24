/**
 * Created by purushotham on 22/3/17.
 */
var mongoose=require('mongoose');
var course=require('../../models/course/course');
var coursesslot=require('../../models/courseSlot/courseSlot');
var SuccessResponse =require('../../models/successResponse/SuccessResponse');
var ErrorResult =require('../../models/errorResult/ErrorResult');
var Q=require('q');
//var Student=require('../../models/Student/student');
var coursesRoute= {
    createCourse: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam);
        var cs = {};
        var newCourse = {};
        newCourse.courseSlot = [];
        console.log(queryParam.slot);
        queryParam.slot.forEach(function(slotObj, slotIndex){
            var deffered = Q.defer();
            console.log(slotIndex);
            console.log("***** inside loop");
            cs.timeSlot=slotObj.timeSlot.label;
            cs.noOfStudents=queryParam.course.noOfStudents;
            cs.availableSlots=queryParam.course.availableSlots;
            console.log(cs);
            var co = new coursesslot(cs);
            co.save(function (err, Slot) {
                if (err) {
                    deffered.reject(err);
                    res.send(err);
                }
                else{
                    console.log("********************* slot");
                    console.log(Slot);
                    newCourse.courseSlot.push(Slot._id);
                    console.log(newCourse.courseSlot);
                    if(slotIndex == queryParam.slot.length-1){
                        console.log("***** after loop");
                        newCourse.name = queryParam.course.name;
                        newCourse.description = queryParam.course.description;
                        newCourse.duration = queryParam.course.duration;
                        newCourse.noOfDays = queryParam.course.noOfDays;
                        newCourse.coach = queryParam.course.coach;
                        newCourse.fee = queryParam.course.fee;
                        //console.log(newCourse)
                        var c = new course(newCourse)
                        //  console.log(c)
                        c.save(function (err1, response) {
                            if (err1) {
                                res.send(err1);
                            }
                            else {
                                console.log(response);
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
        console.log(queryParam);
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
                        console.log(response);
                        var courses = [];
                        for (var i = 0; i < response.length; i++) {
                            var c = {};
                            var e = response[i];
                            c.name = e.name;
                            c.description = e.description;
                            c.duration = e.duration;
                            c.noOfDays = e.noOfDays;
                            c.coach = e.coach;
                            c.fee = e.fee.value;
                            c.id=e._id;
                            c.courseSlot=[];
                            e.courseSlot.forEach(function(slot){
                                c.courseSlot.push(slot)
                            });
                            courses.push(c);
                            var pagination = {};
                            pagination.total = result;

                        }
                        console.log(courses)
                        res.send(new SuccessResponse("ok", courses, pagination, 'success'));
                    }

                });
            }

        });
    }
}
module.exports=coursesRoute;