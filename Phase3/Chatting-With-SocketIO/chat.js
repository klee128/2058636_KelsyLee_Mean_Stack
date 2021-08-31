// javascript code for chat.html

var socket = io();
// send data to server
socket.emit("obj", "Hello Server, I am the Web Socket Client");
// receive data from server
socket.on("obj1", (msg) => {
    console.log(msg);
})