// use server.js's io
var socket = io()

function sendMsg() {
    // get values from input fields
    let name = document.getElementById('name').value;
    let msg = document.getElementById('msg').value;

    // send to server to store in MongoDB
    socket.emit('userMsg', {
        name: name,
        message: msg
    });

    // add to Chat Log
    let msgNode = document.createTextNode(`${name}: ${msg}`);
    let userMsg = document.createElement('p');
    userMsg.style.color = '#613659';
    userMsg.appendChild(msgNode);
    document.getElementById('chatlog').appendChild(userMsg);

    // reset input field
    document.getElementById('name').value = "";
    document.getElementById('msg').value = "";
}