// load the module
let express = require("express");
let bodyParser = require("body-parser"); //used to parse req.body for POST data fields

// create the reference of express module
let app = express();
app.use(bodyParser.urlencoded({ extended: true })); // enable receiving POST data from normal HTML form

// array to store userDetails
let userDetails = [];

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
    res.sendFile(__dirname + "/display_courses.html");
})

// on login formSubmit, do get request to http://.../checkUser
// app.get("/checkUser", (req, res) => {
//     // access data from URL through req.query.data_name
//     let user = req.query.user;
//     let pass = req.query.pass;
//     let found = userDetails.find(u => u.uname == user && u.pname == pass);
//     if (found != undefined) {
//         res.send("Successful login");
//     } else {
//         res.send("Failed Login");
//     }
// })



// when form is submitted and no HTTP method is specified, default is GET
// form data will be displayed through URL
// form data is passed through http RESPONSE.query.formFieldName
// app.get("/register", (req, res) => {
//     res.send("post method worked");
// })

// when form is submitted (if method="POST" is specified), do this instead
// form data will NOT be displayed through URL
// form data is passed through http REQUEST.body
// app.post("/register", (req, res) => {
//     // require body-parser
//     // app.use(body-parser.urlEncoded... )
//     // now can parse through request.body
//     let userDeet = req.body;
//     userDetails.push(userDeet);
//     // console.log(userDeet);
//     // res.write("Account created successfully");
//     res.sendFile(__dirname + "/login.html");    //send to login page
// })

app.listen(9090, () => console.log("Server is running on port 9090"));