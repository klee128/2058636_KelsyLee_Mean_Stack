// load the module
let express = require("express");
let bodyParser = require("body-parser"); //used to parse req.body for POST data fields
let axios = require('axios');

let methodOverride = require('method-override');

// create the reference of express module
let app = express();
app.use(bodyParser.urlencoded({ extended: true })); // enable receiving POST data from normal HTML form
app.use(methodOverride('_method'))


// app.get("path", callback request)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/addCourse", (req, res) => {
    // res.send("Welcome to About Us page")
    res.sendFile(__dirname + "/add_course.html");
});

app.get("/deleteCourse", (req, res) => {
    res.sendFile(__dirname + "/delete_course.html");
});

app.get("/updateCourse", (req, res) => {
    res.sendFile(__dirname + "/update_course.html");
});

app.get("/displayCourses", (req, res) => {
    // res.sendFile(__dirname + "/display_courses.html");
    axios.get('http://localhost:8080/api/course/getAllCourses')
        .then((response) => {
            let table = `
            <table border=1>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Course Description</th>
                    <th>Max Students</th>
                <tr>
            `;
            let courses = response.data;
            courses.forEach(element => {
                table = table + `
                    <tr>
                        <td>${element._id}</td>
                        <td>${element.name}</td>
                        <td>${element._description}</td>
                        <td>${element.maxStudents}</td>
                    </tr>
                `
            });

            table = table + `</table>`;

            res.write(table);
            // console.log(response.data)
        })
        .catch(err => console.log(err));
})

app.get('/call_http.js', (req, res) => {
    res.sendFile(__dirname + "/call_http.js");
})


app.listen(9090, () => console.log("Server is running on port 9090"));
