let http = require('http');  //create a server webpage
let fs = require('fs');     //allow file manipulation
let url = require('url')   //allow app to use url 


let addTaskHtml = `
    <form action="addTask">
        <label>Employee ID</label>
        <input type="text" name="eid" required/>
        <br/>
        <label>Task ID</label>
        <input type="text" name="tid" required/>
        <br />
        <label>Task</label>
        <textarea name="task" required></textarea>
        <br />
        <label>Deadline</label>
        <input type="date" name="deadline" required/>
        <br />
        <button type="submit">Add Task</button>
    </form>
`;

let duplicateTIDhtml = `
    <span style="color:red" > This task ID already exists. Try again. </span>
`;
let duplicateTIDbool = false;

let deleteTaskHtml = `
    <form action="deleteTask">
        <label>Task ID</label>
        <input type="text" name="tid"/>
        <button type="submit">Delete Task</button>
    </form>
`;
let deleteFailMsg = `
    <span style="color:red">Task with that ID does not exist. Try again. </span>
`;
let deleteFailBool = false;

let displayTableHtml = `
    <form action="displayTable">
        <button type="submit">Display Tasks Table</button>
    </form>
`;
let tableBegin = `
    <table border=1>
        <tr>
            <th>Employee ID</th>
            <th>Task ID</th>
            <th>Task</th>
            <th>Deadline</th>
        <tr>
`;
let tableEnd = `
    </table>
`;


let server = http.createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/html" })
    let urlInfo = url.parse(request.url, true);
    console.log(urlInfo.path);
    if (urlInfo.path != "/favicon.ico") {
        if (urlInfo.pathname == "/") {
            response.writeHead(200, { "content-type": "text/html" })
            response.write("Placeholder");
            response.write(addTaskHtml);
            response.write(`<hr />`);
            response.write(deleteTaskHtml);
            response.write(`<hr />`);
            response.write(displayTableHtml);

        }
        // if addTask form submitted
        else if (urlInfo.pathname == "/addTask") {
            // if tasks.json exists... 
            if (fs.existsSync('tasks.json')) {
                let taskArray = JSON.parse(fs.readFileSync('tasks.json').toString());
                let etask = taskArray.find(t => t.tid == urlInfo.query.tid);
                // if task ID exists in tasks.json
                if (etask != undefined) {
                    console.log("task ID already exists");
                    // response.write(duplicateTIDhtml);
                    duplicateTIDbool = true;
                }
                // if task ID doesn't exist in tasks.json
                else {
                    console.log("task ID doesn't exist yet. add task");
                    duplicateTIDbool = false;
                    taskArray.push({
                        eid: urlInfo.query.eid,
                        tid: urlInfo.query.tid,
                        task: urlInfo.query.task,
                        deadline: urlInfo.query.deadline
                    });
                    fs.writeFileSync('tasks.json', JSON.stringify(taskArray));
                }
                // console.log("tasks are: " + taskArray);
            }
            // if tasks.json doesn't exist... 
            else {
                fs.writeFileSync('tasks.json', JSON.stringify([{
                    eid: urlInfo.query.eid,
                    tid: urlInfo.query.tid,
                    task: urlInfo.query.task,
                    deadline: urlInfo.query.deadline
                }]));
            }
            
            response.write("add task");
            response.write(addTaskHtml);
            if (duplicateTIDbool) response.write(duplicateTIDhtml);
            response.write(`<hr/>`);
            response.write(deleteTaskHtml);
            response.write(`<hr />`);
            response.write(displayTableHtml);
        }
        // if deleteTask form submitted
        else if (urlInfo.pathname == "/deleteTask"){
            response.writeHead(200, { "content-type": "text/html" })
            if (fs.existsSync('tasks.json')) {
                let taskArray = JSON.parse(fs.readFileSync('tasks.json').toString());
                let taskIdx = taskArray.findIndex(t => t.tid == urlInfo.query.tid);
                
                if (taskIdx != -1) {
                    deleteFailBool = false;
                    console.log("task exists ind atabase. delete it" + taskIdx);
                    taskArray.splice(taskIdx, 1);
                    fs.writeFileSync('tasks.json', JSON.stringify(taskArray));
                }
                else {
                    console.log("task not in database. error msg?" + taskIdx);
                    deleteFailBool = true;
                }
            }

            response.write("delete task");
            response.write(addTaskHtml);
            response.write(`<hr/>`);
            response.write(deleteTaskHtml);
            if (deleteFailBool) response.write(deleteFailMsg);
            response.write(`<hr />`);
            response.write(displayTableHtml);
            
        }
        // if displayTable button is clicked 
        else if (urlInfo.pathname == "/displayTable") {
            console.log("display the table");
            response.writeHead(200, { "content-type": "text/html" })
            response.write("Placeholder");
            response.write(addTaskHtml);
            response.write(`<hr />`);
            response.write(deleteTaskHtml);
            response.write(`<hr />`);
            response.write(displayTableHtml);
            // code to iterate through tasks.json file and do tables stuff
            let fullTable = tableBegin;
            
            if (fs.existsSync('tasks.json')) {
                let taskArray = JSON.parse(fs.readFileSync('tasks.json').toString());
                taskArray.forEach(task => {
                    fullTable = fullTable + `
                        <tr>
                            <td>${task.eid}</td>
                            <td>${task.tid}</td>
                            <td>${task.task}</td>
                            <td>${task.deadline}</td>
                        </tr>
                    `
                });
            }
            fullTable = fullTable + tableEnd;
            response.write(fullTable);
        }
        else {
            response.write("404 Page Not Found");
        }

    }


    response.end();
})

server.listen(9090, () => console.log("Server running on port 9090"));