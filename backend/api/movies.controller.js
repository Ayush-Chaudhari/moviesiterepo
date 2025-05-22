import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovie(req, res, next) {
    try {
      const movieId = parseInt(req.params.id);
      const movie = await MoviesDAO.getMovie(movieId);
      
      if (!movie) {
        res.status(404).json({ error: "Movie not found" });
        return;
      }
      
      res.json(movie);
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetMovies(req, res, next) {
    try {
      const movies = await MoviesDAO.getMovies();
      res.json(movies);
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiAddMovie(req, res, next) {
    try {
      const movieData = req.body;
      const movie = await MoviesDAO.addMovie(movieData);
      
      if (movie.error) {
        res.status(400).json({ error: movie.error });
        return;
      }
      
      res.json({ status: "success", movie });
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateMovie(req, res, next) {
    try {
      const movieId = parseInt(req.params.id);
      const movieData = req.body;
      const movie = await MoviesDAO.updateMovie(movieId, movieData);
      
      if (movie.error) {
        res.status(400).json({ error: movie.error });
        return;
      }
      
      res.json({ status: "success", movie });
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteMovie(req, res, next) {
    try {
      const movieId = parseInt(req.params.id);
      const result = await MoviesDAO.deleteMovie(movieId);
      
      if (result.error) {
        res.status(400).json({ error: result.error });
        return;
      }
      
      res.json({ status: "success" });
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}