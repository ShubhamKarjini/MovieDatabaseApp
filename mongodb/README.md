# MongoDB Setup

## Installation

1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community

2. Install and run MongoDB:
```bash
   mongod
```

3. Open MongoDB Compass or MongoDB Shell

## Database Setup

### Using MongoDB Shell
```bash
# Start MongoDB shell
mongosh

# Run setup commands
use moviedb

db.createCollection('movies')

db.movies.insertMany([
  {
    title: "Inception",
    genre: ["Action", "Sci-Fi"],
    releaseYear: 2010,
    plot: "A skilled thief leads a team to steal secrets from dreams",
    rating: 8.8,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
  },
  {
    title: "The Dark Knight",
    genre: ["Action", "Crime"],
    releaseYear: 2008,
    plot: "Batman faces a criminal mastermind known as the Joker",
    rating: 9.0,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyNTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
  },
  {
    title: "Interstellar",
    genre: ["Sci-Fi", "Drama"],
    releaseYear: 2014,
    plot: "A team of explorers travel through a wormhole in space",
    rating: 8.6,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMGZkNWIyODZiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
  }
])
```

### Using MongoDB Compass

1. Connect to `mongodb://localhost:27017`
2. Create new database: `moviedb`
3. Create new collection: `movies`
4. Add sample documents from `setup.js`

## Database Collections

### Movies Collection
- `title` (String)
- `genre` (Array)
- `releaseYear` (Number)
- `plot` (String)
- `rating` (Number 0-10)
- `director` (String)
- `cast` (Array)
- `posterUrl` (String)

### Users Collection
- `username` (String)
- `email` (String)
- `password` (String - hashed)

## Verify Setup
```bash
# In MongoDB shell
use moviedb
db.movies.find()
db.users.find()
```

You should see the sample movies and any registered users.
```

**Your final structure:**
```
movie-database-app/
├── frontend/
├── backend/
├── mongodb/
│   ├── README.md
│   └── setup.js
├── SCREENSHOTS.md
└── README.md