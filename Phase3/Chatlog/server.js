// set up express
let express = require('express');
let bodyParser = require('body-parser')

// set up mongoose
let mongoose = require('mongoose');
mongoose.pluralize(null);
let messageModel = require('./message.model');

// set up server
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let http = require('http').Server(app);
// set up socket.io
let io = require('socket.io')(http);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
})
app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client.js');
})


io.on('connection', (socket) => {
 
    socket.on('userMsg', (msg) => {
        
        // create mongoDB database
        mongoose.connect('mongodb://localhost:27017/Chatlog')
            .then(res => console.log('Connected to database'))
            .catch(err => console.log(err));
        
        mongoose.connection.on('open', () => {
            console.log('open db');
            messageModel.insertMany(msg, (err, result) => {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
        })

    })
    
})


// run server using http's server (not express's server)
http.listen(9090, () => console.log("Server listening on port 9090"));