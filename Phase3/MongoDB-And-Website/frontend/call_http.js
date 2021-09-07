import axios from 'axios';
// let axios = require('axios');


document.getElementById('submitbutton').onclick = function () {
    console.log("button clicked")
    let id = document.getElementById('_id').value;
    let maxStud = document.getElementById('maxStudents').value;
    console.log("id: " + id + " maxStud: " + maxStud);

    axios.put('http://localhost:8080/api/course/updateCourse', { _id: id, maxStudents: maxStud })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}