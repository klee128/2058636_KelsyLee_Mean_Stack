let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let courseRouter = require('./router/course.router');

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let url = 'mongodb://localhost:27017/CourseRecords';

mongoose.connect(url)
    .then(res => console.log("Connected to database"))
    .catch(err => console.log(err));

// any url with the path "/api/course", further subpaths can be found in courseRouter
// look in ./router/course.router.js
app.use('/api/course', courseRouter);

app.listen(8080, () => console.log("Server is running on port 8080"));