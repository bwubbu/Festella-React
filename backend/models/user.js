const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    // add other fields as necessary
});

const User = mongoose.model('User', userSchema);

module.exports = User;