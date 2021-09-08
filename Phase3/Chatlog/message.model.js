let mongoose = require('mongoose');
mongoose.pluralize(null);

let messageSchema = mongoose.Schema({
    _id: Number,
    name: String,
    message: String
});

let messageModel = mongoose.model('Messages', messageSchema);

module.exports = messageModel;
