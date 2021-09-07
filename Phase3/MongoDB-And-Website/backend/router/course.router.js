// coming from app.js
// given a path localhost:8080/api/course/[subpath]
// connect the subpath to its HTTP request
// go to ../controller/course.controller.js for what that HTTP request will do

let express = require('express');
let courseController = require('../controller/course.controller');

// create a router referrence from express module
// route to controller functions based on the given path
let router = express.Router();

// given a SUBpath, connect it to a controller function
// full path: localhost:9090/api/product/[subpath from courseController]

router.post('/addCourse', courseController.addCourseInfo);
router.delete('/deleteCourse/:cid', courseController.deleteCourseInfo);
router.put('/updateCourse', courseController.updateCourseInfo);
router.get('/getAllCourses', courseController.displayAllCourseInfo);

// export all the submaths
module.exports = router;