const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const UserSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isStudent: { type: Boolean, required: true },
  studentSchool: { type: String, default: '' },
  isAdmin: { type: Boolean, required: true },
});

const User = userConnection.model('users', UserSchema);
module.exports = User;
