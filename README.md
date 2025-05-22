# Movie Application

A full-stack web application for browsing movies, viewing details, and managing reviews. Built with modern web technologies and a responsive design.

![Movie App Screenshot]
![image](https://github.com/user-attachments/assets/26d92ff3-7d7c-41ba-b015-6e48ce9208b7)


## Features

- 🎬 Browse popular movies from The Movie Database (TMDB)
- 🔍 Search for specific movies
- 📱 Responsive design that works on all devices
- 🌙 Dark theme for better viewing experience
- ⭐ Rate and review movies
- 💬 View and manage movie reviews
- 🎨 Modern UI with smooth animations

## Tech Stack

### Frontend
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript
- Express.js (for serving static files)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

### External APIs
- The Movie Database (TMDB) API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movieapp.git
cd movieapp
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/moviedb
PORT=5000
```

5. Get a TMDB API key:
   - Go to [TMDB](https://www.themoviedb.org/)
   - Create an account and request an API key
   - Replace the API key in `script.js` with your own

## Running the Application

1. Start the backend server:
```bash
cd backend
node index.js
```

2. In a new terminal, start the frontend server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
movieapp/
├── index.html          # Frontend HTML
├── style.css           # Frontend styling
├── script.js           # Frontend JavaScript
├── server.js           # Frontend server
├── package.json        # Frontend dependencies
└── backend/
    ├── index.js        # Backend entry point
    ├── server.js       # Backend Express app
    ├── app.js          # Backend Express configuration
    ├── .env            # Environment variables
    ├── models/
    │   ├── movie.js    # Movie Mongoose model
    │   └── review.js   # Review Mongoose model
    ├── dao/
    │   ├── moviesDAO.js # Movie data access operations
    │   └── reviewsDAO.js # Review data access operations
    └── api/
        ├── reviews.route.js    # Review API routes
        └── reviews.controller.js # Review API controllers
```

## API Endpoints

### Reviews API

- `GET /api/v1/reviews/movie/:movieId` - Get all reviews for a movie
- `POST /api/v1/reviews/new` - Add a new review
- `GET /api/v1/reviews/review/:reviewId` - Get a specific review
- `PUT /api/v1/reviews/review/:reviewId` - Update a review
- `DELETE /api/v1/reviews/review/:reviewId` - Delete a review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is free to use for educational purposes and learning.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the web framework
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling

## Contact

Project Link: (https://github.com/Ayush-Chaudhari/moviesiterepo)
