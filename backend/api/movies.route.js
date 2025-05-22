import express from "express";
import MoviesCtrl from "./movies.controller.js";

const router = express.Router();

router.route("/").get(MoviesCtrl.apiGetMovies);
router.route("/:id").get(MoviesCtrl.apiGetMovie);
router.route("/new").post(MoviesCtrl.apiAddMovie);
router.route("/:id").put(MoviesCtrl.apiUpdateMovie);
router.route("/:id").delete(MoviesCtrl.apiDeleteMovie);

export default router;