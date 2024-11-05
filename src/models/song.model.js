const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  genre: {
    type: String,
    default: null,
  },

  lyrics: {
    type: String,
    default: null,
  },

  artworkCoverUri: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },

  audioURI: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },

  releaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
