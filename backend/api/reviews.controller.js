import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiGetReviews(req, res, next) {
    try {
      const movieId = parseInt(req.params.movieId);
      const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);
      
      if (!reviews) {
        res.status(404).json({ error: "Reviews not found" });
        return;
      }
      
      res.json(reviews);
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;
      const rating = req.body.rating || 5;
      
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review,
        rating
      );
      
      if (reviewResponse.error) {
        res.status(400).json({ error: reviewResponse.error });
        return;
      }
      
      res.json({ status: "success" });
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      const reviewId = req.params.reviewId;
      const review = await ReviewsDAO.getReview(reviewId);
      
      if (!review) {
        res.status(404).json({ error: "Review not found" });
        return;
      }
      
      res.json(review);
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.reviewId;
      const review = req.body.review;
      const user = req.body.user;
      const rating = req.body.rating || 5;
      
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review,
        rating
      );
      
      if (reviewResponse.error) {
        res.status(400).json({ error: reviewResponse.error });
        return;
      }
      
      res.json({ status: "success" });
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.reviewId;
      
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      
      if (reviewResponse.error) {
        res.status(400).json({ error: reviewResponse.error });
        return;
      }
      
      res.json({ status: "success" });
    } catch (e) {
      console.error(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}