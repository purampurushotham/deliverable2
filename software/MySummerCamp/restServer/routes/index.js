var express = require('express');
/*var router = express.Router();*/
var path = require('path');
var courses=require('./course/courseRoute');
var student=require('./student/studentRoute')
/* GET home page. */
var appRoutes=function(app) {
  app.post('/api/v1.0/createCourse',courses.createCourse);
  app.get('/api/v1.0/getCourses',courses.getCourses);
  app.get('/api/v1.0/checkMail',student.checkMail);
  app.post("/api/v1.0/enrollStudent",student.enrollStudent);

};
module.exports = appRoutes;
