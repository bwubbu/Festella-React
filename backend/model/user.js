const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    image: String,
    bookmarkedEvents: [String],
    registeredEvents: [String]
})

const Profile = mongoose.model('Profile', profileSchema);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profile: { type: profileSchema, default: {} },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

const User = mongoose.model('User', userSchema);

module.exports = Profile;
module.exports = User;