const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const authMiddleware = require('../middleware/auth');

// Get all movies (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const { genre, year, search } = req.query;
    let query = {};
    
    if (genre) query.genre = genre;
    if (year) query.releaseYear = year;
    if (search) query.title = { $regex: search, $options: 'i' };
    
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single movie (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create movie (PROTECTED)
router.post('/', authMiddleware, async (req, res) => {
  const movie = new Movie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update movie (PROTECTED)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    Object.assign(movie, req.body);
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete movie (PROTECTED)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;