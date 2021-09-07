// load the module
let express = require("express");
let bodyParser = require("body-parser"); //used to parse req.body for POST data fields
let axios = require('axios');

// create the reference of express module
let app = express();
app.use(bodyParser.urlencoded({ extended: true })); // enable receiving POST data from normal HTML form

// app.get("path", callback request)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/addCourse", (req, res) => {
    res.sendFile(__dirname + "/add_course.html");
});
app.post('/addCourse', (req, res) => {
    axios.post("http://localhost:8080/api/course/addCourse", req.body)
        .then((response) => {
            console.log(response.data);
            res.redirect('http://localhost:9090/')
        })
        .catch((err) => console.log(err));
});

app.get("/deleteCourse", (req, res) => {
    res.sendFile(__dirname + "/delete_course.html");
});
app.post("/deleteCourse", (req, res) => {
    console.log(req.body);
    let url = "http://localhost:8080/api/course/deleteCourse/" + req.body._id
    axios.delete(url)
        .then((response) => {
            console.log(response.data);
            res.redirect('http://localhost:9090/')
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/updateCourse", (req, res) => {
    res.sendFile(__dirname + "/update_course.html");
});
app.post('/updateCourse', (req, res) => {
    // do axios call to backend put request
    axios.put("http://localhost:8080/api/course/updateCourse", req.body)
        .then((response) => {
            console.log(response.data);
            res.redirect('http://localhost:9090/')
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/displayCourses", (req, res) => {
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
                        <td>${element.description}</td>
                        <td>${element.maxStudents}</td>
                    </tr>
                `
            });

            table = table + `
                </table>
                <br/>
                <a href="/"> Back <a>
            `;
            res.write(table);
        })
        .catch(err => console.log(err));
});




app.listen(9090, () => console.log("Client is running on port 9090"));
