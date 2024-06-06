const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    image: String,
})

const Profile = mongoose.model('Profile', profileSchema);

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile: Profile.schema
});

const User = mongoose.model('User', userSchema);

module.exports = Profile;
module.exports = User;