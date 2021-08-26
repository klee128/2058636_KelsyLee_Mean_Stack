let http = require('http');  //create a server webpage
let fs = require('fs');     //allow file sharing

let addTaskHtml = `
    <form>
        <label>Employee ID</label>
        <input type="text" name="eid"/>
        <br/>
        <label>Task ID</label>
        <input type="text" name="tid"/>
        <br />
        <label>Task</label>
        <textarea name="task"></textarea>
        <br />
        <label>Deadline</label>
        <input type="date" name="deadline"/>
        <br />
        <button type="submit">Add Task</button>
    </form>
    <hr/>
`;

let deleteTaskHtml = `
    <form>
        <label>Task ID</label>
        <input type="text" name="tid"/>
        <button type="submit">Delete Task</button>
    </form>
`;

let server = http.createServer((request, response) => {
    console.log(request.body);
    response.writeHead(200, { "content-type": "text/html" })
    response.write("Placeholder");
    response.write(addTaskHtml);
    response.write(deleteTaskHtml);

    response.end();
})

server.listen(9090, () => console.log("Server running on port 9090"));