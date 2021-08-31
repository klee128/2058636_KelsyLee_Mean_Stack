let express = require('express');
let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/chat.html");
})
// so chat.html can use chat.js functions
app.get("/chat.js", (req, res) => {
    res.sendFile(__dirname + "/chat.js");
})

// when transferring data between server and client ... 
// keep track of data by their keys 
io.on("connection", (socket) => {
    console.log("Client connected");
    // socket.on("this must match whatever is in script in index.html")
    // client -> server
    socket.on("obj", (msg) => {
        console.log(msg);
    })

    // server -> client
    socket.emit("obj1", "Hello Client. You have connected to Server.")
})
// run server using http module not express module
http.listen(9090, () => console.log("Server running on port 9090"));
