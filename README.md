# Movie Database Application

## 📽️ Overview
A full-stack movie database application built with Angular, Node.js, Express, and MongoDB. Users can view, search, filter, add and delete movies with JWT authentication.

## 🎯 Features
- **User Authentication**: Register and login with JWT tokens
- **Movie Management**: Add, view, edit, and delete movies (authenticated users only)
- **Search & Filter**: Search by title, filter by genre and year
- **Responsive Design**: Modern UI with SCSS styling
- **Real-time Updates**: RxJS observables for reactive data flow

## 🛠️ Tech Stack

### Frontend
- Angular 17+
- RxJS
- SCSS
- HTTP Client
- Dependency Injection
- JWT Interceptor

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

### Database
- MongoDB

## 📋 Project Structure
```
movie-database-app/
├── frontend/              # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── app.module.ts
│   │   └── main.ts
│   └── package.json
├── backend/               # Node.js server
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── mongodb/               # Database setup
│   └── sample-data.js
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB running locally
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup
```bash
cd backend
npm install
# Install additional packages
npm install express mongoose cors bcryptjs jsonwebtoken

# Start server
node server.js
```

Server runs on `http://localhost:3000`

### Database Setup
```bash
# Start MongoDB
mongod

# In MongoDB shell or Compass
use moviedb
db.createCollection('movies')

# Insert sample data (see mongodb/sample-data.js)
```

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```

Frontend runs on `http://localhost:4200`

## 🔐 Authentication

### Register
```bash
POST http://localhost:3000/api/auth/register
Body: {
  "username": "user",
  "email": "user@example.com",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:3000/api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
```

Returns JWT token - use for authenticated requests.

## 🎬 API Endpoints

### Public Routes (No Auth Required)
- `GET /api/movies` - Get all movies with filters
- `GET /api/movies/:id` - Get single movie

### Protected Routes (Auth Required)
- `POST /api/movies` - Add new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## 📝 Features in Detail

### 1. Movie Listing
- View all movies in a responsive grid
- Real-time search with debouncing
- Filter by genre and release year

### 2. Authentication
- Register new user with email
- Login with JWT token
- Token stored in localStorage
- Auto-attach token to all API requests via interceptor

### 3. Movie Management
- Add new movies (authenticated users only)
- Delete movies
- View movie details

### 4. UI/UX
- Modern dark theme with gradients
- Smooth animations and transitions
- Responsive design
- Loading and error states

## 🔄 Data Flow
```
User → Login → JWT Token → Stored in localStorage
             ↓
User Makes Request → JwtInterceptor adds token to headers
             ↓
Backend validates token → Sends response
             ↓
Frontend updates via RxJS observables
```

## 📚 Key Technologies Explained

### Angular & RxJS
- `BehaviorSubject` for state management
- `Observable` streams for reactive data
- `takeUntil` for memory leak prevention
- `switchMap`, `tap`, `catchError` operators

### JWT Authentication
- Secure token-based authentication
- Passwords hashed with bcryptjs
- Token expiration set to 7 days
- Interceptor for automatic token injection

### SCSS
- Nested selectors for maintainable code
- Variables for colors and spacing
- Mixins for reusable styles
- Responsive media queries

## 🐛 Troubleshooting

### Backend not connecting
- Ensure MongoDB is running: `mongod`
- Check port 3000 is available
- Verify connection string in server.js

### Frontend can't reach backend
- Check backend is running on port 3000
- Verify CORS is enabled in server.js
- Check browser console for network errors

### Login not working
- Ensure user is registered first
- Check email and password are correct
- Verify JWT secret matches in backend

## 👨‍💻 Author
Shubham Karjini
