import Review from "../models/review.js"

export default class ReviewsDAO {
  static async addReview(movieId, user, review, rating) {
    try {
      const reviewDoc = new Review({
        movieId: movieId,
        user: user,
        review: review,
        rating: rating || 5,
        date: new Date()
      })
      console.log("adding review")
      return await reviewDoc.save()
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      return await Review.findById(reviewId)
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, review, rating) {
    try {
      const updateResponse = await Review.findByIdAndUpdate(
        reviewId,
        { $set: { user: user, review: review, rating: rating || 5 } },
        { new: true }
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await Review.findByIdAndDelete(reviewId)
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      return await Review.find({ movieId: parseInt(movieId) }).sort({ date: -1 })
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`)
      return { error: e }
    }
  }
}