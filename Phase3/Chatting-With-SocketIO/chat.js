// create a reference to server.js io
var socket = io();


// on button click, send the user input to the server and get a response
function sendMsg() {
    // get user input from textfield and reset it
    let userInput = document.getElementById("urMsg").value;
    document.getElementById("urMsg").value = "";

    // create <p> tag with user's message and display it to chatlog
    let msgNode = document.createTextNode(`You: ${userInput}`);
    let userResponse = document.createElement("p");
    userResponse.style.color = "#B52B40";
    userResponse.appendChild(msgNode);
    document.getElementById("chatlog").appendChild(userResponse);

    // client sends user input to server
    socket.emit("userMsg", userInput);

    // client receives response from server
    socket.once("servResponse", (servMsg) => {
        // create <p> tag with server message
        let servMsgNode = document.createTextNode(servMsg);
        let serverResponse = document.createElement("p")
        serverResponse.appendChild(servMsgNode);

        // add server message to chat log and scroll to bottom
        let chatlog = document.getElementById("chatlog");
        chatlog.appendChild(serverResponse);
        chatlog.scrollTop = chatlog.scrollHeight
    })
}
