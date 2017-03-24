/*
/!**
 * Created by purushotham on 22/3/17.
 *!/
var mongoose = require('mongoose')
var fs = require("fs");
var Q = require('q');
var course=require('./models/course/course')
var courseSlot=require('./models/courseSlot/courseSlot')
var student=require('./models/Student/student')
var dateFormat = require('dateformat');
var moment = require('moment');
mongoose.connect('mongodb://localhost/MySummerCamp');
var db = mongoose.connection;
var dbCollection = db.collections;
// Get content from file
var contents = fs.readFileSync("../client/data.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
console.log(jsonContent)
for(var i=0;i<jsonContent.length;i++){
    insertCourses(jsonContent[i])
}
*/
