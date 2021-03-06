const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'A user must have a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A user must provide a password'],
    },
    profilePic: {
      type: String,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
