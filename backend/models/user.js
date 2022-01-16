const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User = mongoose.model('users', UserSchema);

module.exports = User