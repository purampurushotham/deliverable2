/**
 * Created by purushotham on 22/3/17.
 */
var mongoose=require('mongoose');
var course=require('../../models/course/course');
var coursesslot=require('../../models/courseSlot/courseSlot');
//var Student=require('../../models/Student/student');
var coursesRoute={
    createCourse : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam)
        var cs={};
        cs.timeSlot=queryParam.timeSlot;
            cs.noOfStudents=queryParam.noOfStudents;
            cs.availableSlots=queryParam.availableSlots;
        var co=new coursesslot(cs)
        console.log(co)
            /*co.save(function(err,Slot) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(Slot);
                    var c = new course();
                    console.log(c)
                    c.name = queryParam.name;
                    c.description = queryParam.description;
                    c.duration = queryParam.duration;
                    c.noOfDays = queryParam.noOfDays;
                    c.coach = queryParam.coach;
                    c.fee = queryParam.fee;
                    if (c.courseSlot.length == 0) {
                        c.courseSlot.push(cs._id);
                    }
                    else {
                        if (!c.courseSlot.includes(cs._id)) {
                            c.courseSlot.push(cs._id)
                        }
                        c.save(function (err1,response){
                            if(err1){
                                res.send(err1);
                            }
                            else{
                                console.log(response);
                                res.send("success")
                            }
                        })
                    }
                }
            })*/
    }

};
module.exports=coursesRoute;