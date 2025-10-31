const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: [String],
  releaseYear: Number,
  plot: String,
  rating: { type: Number, min: 0, max: 10 },
  director: String,
  cast: [String],
  posterUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);

