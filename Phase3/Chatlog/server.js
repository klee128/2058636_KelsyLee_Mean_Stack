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


// link to client.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
})
// function
app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client.js');
})


io.on('connection', (socket) => {
 
    socket.on('userMsg', (msg) => {
        
        // create mongoDB database
        mongoose.connect('mongodb://localhost:27017/Chatlog')
            .then(res => console.log('Connected to database'))
            .catch(err => console.log(err));
        
        // mongoose insert operation
        mongoose.connection.once('open', () => {
            
            messageModel.count({}, (err, result) => {
                if (err) console.log('error w/ count')
                else {
                    // if 1st entry in table
                    if (result == 0) {
                        messageModel.insertMany([{
                            name: msg.name,
                            message: msg.message,
                            userID: 1
                        }], (err, result) => {
                            if (!err) console.log(result);
                            else console.log(err);
                        });
                    }
                    // table has existing records
                    else {
                        messageModel.find({ name: msg.name }, (err, result) => {
                            if (err) console.log('error finding name')
                            // name exists in table. reuse userID
                            else if (result[0]) {
                                messageModel.insertMany([{
                                    name: msg.name,
                                    message: msg.message,
                                    userID: result[0].userID
                                }], (err, result) => {
                                    if (!err) console.log(result);
                                    else console.log(err);
                                });
                            } // end of name exists in table. reuse userID
                            // name does not exist in table. create new userID
                            else {
                                messageModel.aggregate([{
                                    $group: { _id: null, maxId: { $max: '$userID' } }
                                }],
                                    (err, result) => {
                                        if (!err) {
                                            messageModel.insertMany([{
                                                name: msg.name,
                                                message: msg.message,
                                                userID: result[0].maxId + 1
                                            }], (err, result) => {
                                                if (!err) console.log(result);
                                                else console.log(err);
                                            });
                                        }
                                        else console.log('error max uID')
                                    }
                                )
                                
                            } // end of name does not exist in table. create new userID
                                
                        })
                    } //end of table has existing records
                }
            }) // end of messageModel.count
        }) //end of mongoose.connection
    }) //end of socket.on
    mongoose.disconnect();
}) //end of io.on


// run server using http's server (not express's server)
http.listen(9090, () => console.log("Server listening on port 9090"));