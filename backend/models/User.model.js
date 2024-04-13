// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  oldPassword: String,
  password: { type: String, required: true },
  avatar: { type: String }
});

module.exports = mongoose.model('User', userSchema);
