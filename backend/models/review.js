import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  date: {
    type: Date,
    default: Date.now
  },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }
}, {
  timestamps: true
});

export default mongoose.model("Review", reviewSchema);
