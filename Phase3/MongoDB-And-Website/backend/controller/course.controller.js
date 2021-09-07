// coming from ../router/course.router.js
// the function will get a HTTP request (with body) and return a HTTP response
// do the database operation using the data in the body
// go to ../model/course.model.js to get the correct table in the database and its format

let courseModel = require('../model/course.model');


let addCourseInfo = (request, response) => {
    let course = request.body;
    courseModel.insertMany(course, (err, result) => {
        if (!err) {
            response.send(result);
        }
        else {
            response.send(err);
        }
    })
}

let deleteCourseInfo = (request, response) => {
    // courseID found in url
    let cid = request.params.cid;
    courseModel.deleteOne({ _id: cid }, (err, result) => {
        if (!err) {
            // will need to look into this more for a more specific success message
            response.send(result);
        }
        else {
            response.send(err);
        }
    })
}

let updateCourseInfo = (request, response) => {
    let course = request.body;
    courseModel.updateOne({ _id: course._id }, { $set: { maxStudents: course.maxStudents } }, (err, result) => {
        if (!err) {
            response.send(result);
        }
        else {
            response.send(err);
        }
    })
}

let displayAllCourseInfo = (request, response) => {
    courseModel.find({}, (err, result) => {
        if (!err) {
            response.send(result);
        }
        else {
            response.send(err);
        }
    })
}

module.exports = { addCourseInfo, deleteCourseInfo, updateCourseInfo, displayAllCourseInfo };