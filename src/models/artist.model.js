const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60,
  },

  artistName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  bio: {
    type: String,
    required: false,
  },

  profilePicture: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },

  albums: {
    type: [String],
    required: true,
  },

  songs: {
    type: [String],
    required: true,
  },
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
