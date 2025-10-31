const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviedb');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));