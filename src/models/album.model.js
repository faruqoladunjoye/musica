const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  },

  genre: {
    type: String,
    required: false,
  },

  artworkCoverUri: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },

  songs: {
    type: [String],
    required: false,
  },

  releaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
