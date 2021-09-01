let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// array of server responses
let responseArray = [
    "That is a good question, let me find out for you.",
    "I’m not sure, but let me find out for you.",
    "I’m sorry, I don’t have the information on that. May I put you on hold for a few minutes?",
    "Would you mind holding on for a few minutes while I am checking this with our administrator?",
    "I’m sorry, we don’t have this feature at moment. We do intend to add it to our service and we can notify you when it has been done. Would you like to receive an email update?",
    "I am really sorry this has happened. Let me see if I can find a solution to it.",
    "I’m sorry you are not happy with our product/with your purchase. Let’s see what we can do to make things right."
];

// all three are needed to successfully run the app
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/chat.html");
})
app.get("/chat.js", (req, res) => {
    res.sendFile(__dirname + "/chat.js");
})
app.get("/chat.css", (req, res) => {
    res.sendFile(__dirname + "/chat.css");
})

// when transferring data between server and client ... 
// keep track of data by their keys 
io.on("connection", (socket) => {
    console.log("Client has connected to server.");

    // server receive userMsg from client
    socket.on("userMsg", (msg) => {
        console.log("Client sent: " + msg);
        let time = new Date().toTimeString().split(' ')[0];
        let random = new Date().getSeconds() % responseArray.length;
        // send a random server response back to client
        socket.emit("servResponse", "Server (" + time + "): " + responseArray[random]);
    })

})

// run server using http module not express module
http.listen(9090, () => console.log("Server running on port 9090"));
