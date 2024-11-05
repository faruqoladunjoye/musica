const mongoose = require('mongoose');
const validator = require('validator');
const { roles } = require('../config/roles');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60,
  },

  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email',
    },
  },

  phoneNumber: {
    type: String,
    validate: {
      validator: (value) => !value || /^(\+\d{1,3})?\d{10}$/.test(value),
      message: 'Invalid phone number format',
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        ),
      message: 'Password must contain at least one letter and one number',
    },
  },

  profilePicture: {
    type: String,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: 'Invalid URL',
    },
  },

  role: {
    type: String,
    enum: roles,
    default: 'listener',
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
