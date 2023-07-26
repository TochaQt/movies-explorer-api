const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
