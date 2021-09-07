// coming from ../router/course.router.js
// the function will get a HTTP request (with body) and return a HTTP response
// do the database operation using the data in the body
// go to ../model/course.model.js to get the correct table in the database and its format

let courseModel = require('../model/course.model');


let addCourseInfo = (request, response) => {
    let course = request.body;
    console.log("course info is: ");
    console.log(course);
    courseModel.insertMany(course, (err, result) => {
        if (!err) {
            response.redirect('http://localhost:9090/')
            // response.send(result);
        }
        else {
            response.send(err);
        }
    })
    
}

let deleteCourseInfo = (request, response) => {
    // courseID found in url
    // let cid = request.params.courseID;
    let course = request.body;
    console.log("course info is ");
    console.log(course);
    courseModel.deleteOne({ _id: course._id }, (err, result) => {
        if (!err) {
            // will need to look into this more for a more specific success message
            // response.send(result);
            response.redirect('http://localhost:9090/')
        }
        else {
            response.send(err);
        }
    })
}

let updateCourseInfo = (request, response) => {
    let course = request.body;
    console.log(course);
    courseModel.updateOne({ _id: course._id }, { $set: { maxStudents: course.maxStudents } }, (err, result) => {
        if (!err) {
            // response.send(result);
            response.redirect('http://localhost:9090/')
        }
        else {
            response.send(err);
        }
    })
}

let displayAllCourseInfo = (request, response) => {
    courseModel.find({}, (err, result) => {
        if (!err) {
            console.log(result)
            response.send(result);
        }
        else {
            response.send(err);
        }
    })
}

module.exports = { addCourseInfo, deleteCourseInfo, updateCourseInfo, displayAllCourseInfo };