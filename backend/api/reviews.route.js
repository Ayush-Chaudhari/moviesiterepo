import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

// Get all reviews for a specific movie
router.get("/movie/:movieId", ReviewsCtrl.apiGetReviews);

// Create a new review
router.post("/new", ReviewsCtrl.apiPostReview);

// Get, update, and delete a specific review
router.get("/review/:reviewId", ReviewsCtrl.apiGetReview);
router.put("/review/:reviewId", ReviewsCtrl.apiUpdateReview);
router.delete("/review/:reviewId", ReviewsCtrl.apiDeleteReview);

export default router;