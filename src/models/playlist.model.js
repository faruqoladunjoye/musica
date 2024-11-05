const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  description: {
    type: String,
    required: false,
  },

  songs: {
    type: [String],
    required: true,
  },

  playlistCoverUri: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/.test(v); // regex to check URL format
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
