import Movie from "../models/movie.js";

class MoviesDAO {
  static async getMovieById(id) {
    try {
      return await Movie.findById(id);
    } catch (error) {
      console.error(`Error in getMovieById: ${error}`);
      throw error;
    }
  }

  static async getAllMovies() {
    try {
      return await Movie.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error(`Error in getAllMovies: ${error}`);
      throw error;
    }
  }

  static async addMovie(movieData) {
    try {
      const movie = new Movie(movieData);
      return await movie.save();
    } catch (error) {
      console.error(`Error in addMovie: ${error}`);
      throw error;
    }
  }

  static async updateMovie(id, movieData) {
    try {
      return await Movie.findByIdAndUpdate(
        id,
        { $set: movieData },
        { new: true }
      );
    } catch (error) {
      console.error(`Error in updateMovie: ${error}`);
      throw error;
    }
  }

  static async deleteMovie(id) {
    try {
      return await Movie.findByIdAndDelete(id);
    } catch (error) {
      console.error(`Error in deleteMovie: ${error}`);
      throw error;
    }
  }
}

export default MoviesDAO; 