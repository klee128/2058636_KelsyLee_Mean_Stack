// use server.js's io
var socket = io()

function sendMsg() {
    let name = document.getElementById('name').value;
    let msg = document.getElementById('msg').value;

    // console.log(name + msg);
    socket.emit('userMsg', {
        name: name,
        message: msg
    });

    document.getElementById('sendMsgForm').reset();
}