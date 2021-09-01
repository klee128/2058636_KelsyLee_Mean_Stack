// javascript code for chat.html
//test push
var socket = io();
// send data to server
socket.emit("obj", "Hello Server, I am the Web Socket Client");

// receive data from server
socket.on("obj1", (msg) => {
    console.log(msg);
})

// get user input from textfield
// append to existing chatlog 
// send to server
function sendMsg(){
    let msg = document.getElementById("urMsg").value;
    console.log(msg);
    document.getElementById("urMsg").value = "";
    let msgNode = document.createTextNode(`You: ${msg}`);
    let p = document.createElement("p");
    p.appendChild(msgNode);
    document.getElementById("chatlog").appendChild(p);
}