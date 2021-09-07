// coming from ../controller/course.controller.js
// define the table and its schema/template

let mongoose = require('mongoose');
mongoose.pluralize(null);   // to keep database name as typed

// create the schema
let courseSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    maxStudents: Number
});


// create a table named "Courses" in the current database
// Courses table will have the format defined in courseSchema
let courseModel = mongoose.model("Courses", courseSchema);

// export productModel/table so other files can use this using 'require' keyword
module.exports = courseModel;