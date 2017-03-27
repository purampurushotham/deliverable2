/**
 * Created by purushotham on 23/3/17.
 */
var mongoose=require('mongoose');
var course=require('../../models/course/course');
var student=require('../../models/Student/student')
var coursesslot=require('../../models/courseSlot/courseSlot');
var SuccessResponse =require('../../models/successResponse/SuccessResponse');
var ErrorResult =require('../../models/errorResult/ErrorResult');
var appUtils =require('../../utils/app.utils')
var StudentRoute= {
    checkMail: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q
        var regularExpression = "/^" + queryParam.keyword + "/i";
        var regex = new RegExp(queryParam.keyword, "i");
        var query = {email: {$regex: regex}};
        student.findOne(query).exec(function (err, emailsSet) {
            if (err) {
                res.send(err);
            }
            else if (emailsSet != null) {
                res.send(new SuccessResponse('ok', emailsSet.email, '', "email exists"));
                res.end();
            }
            else {
                res.send(new SuccessResponse('ok', '', '', "new Email address"));
                res.end();
            }
        });
    },
    enrollStudent: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        course.findOne({_id: queryParam.id}).exec(function (err, courseObj) {
            if (err) {
                return res.json(new ErrorResult("failed", err, [{'msg': 'error'}]))
            } else if (courseObj != null) {
                var studentObject = appUtils.getStudentObj(queryParam.student)
                var newStudent = new student(studentObject);
                newStudent.save(function (err2,eachStudent) {
                    if (err2) {
                        return res.json(new ErrorResult("failed", err2, [{'msg': 'error'}]))
                    }
                    else if(eachStudent!= null){
                        coursesslot.findOneAndUpdate({_id: queryParam.student.slotId}, {$inc: {"availableSlots": -1, "noOfStudents": 1}})
                            .exec(function (err1, slot) {
                                if (err1) {
                                    return res.json(new ErrorResult("failed", err1, [{'msg': 'error'}]))
                                } else if (slot != null) {
                                }
                            });
                        res.send(new SuccessResponse("ok",'','','success'))
                    }
                });

            }
        })
    }
}
module.exports=StudentRoute;