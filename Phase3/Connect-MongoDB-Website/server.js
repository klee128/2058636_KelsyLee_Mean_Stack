let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


// set up MongoDB info
let mongoose = require('mongoose');
mongoose.pluralize(null);
let url = "mongodb://localhost:27017/CourseRecords";
mongoose.connect(url)
    .then(result => console.log("Connected to database"))
    .catch(err => console.log(err));
let db = mongoose.connection;

// 1. define schema for database
let courseSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    maxStudents: Number
});

// 2. using schema, create a table
let courseModel = mongoose.model("Course", courseSchema);

app.post('addCourse', (request, response) => {
    console.log(request.body);
})

app.listen(9090, () => console.log("Server is running on port 9090"));
