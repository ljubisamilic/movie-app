const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const Movie = require("../models/movies");

// get popular movies
router.get("/", async (req, res) => {
  try {
    const page = req.query.page;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`
    );
    let movies = response.data.results.map((movie) => {
      return {
        id: movie.id,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      };
    });
    return res.status(200).json({
      page: response.data.page,
      movies,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

// get single movie
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
    );
    if (!response.data) {
      return res
        .status(400)
        .json({ msg: `Theres is no movie with id ${req.params.id}` });
    }
    const movie = {
      movieId: req.params.id,
      budget: response.data.budget,
      genres: response.data.genres,
      original_title: response.data.original_title,
      overview: response.data.overview,
      poster_path: response.data.poster_path,
      release_date: response.data.release_date,
      runtime: response.data.runtime,
      spoken_languages: response.data.spoken_languages,
      vote_average: response.data.vote_average,
      favorite: false,
    };
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/auth/:id", auth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
    );
    if (!response.data) {
      return res
        .status(400)
        .json({ msg: `Theres is no movie with id ${req.params.id}` });
    }

    const favorite = await Movie.exists({
      id: req.params.id,
      createdBy: req.user.id,
    });

    const movie = {
      movieId: req.params.id,
      budget: response.data.budget,
      genres: response.data.genres,
      original_title: response.data.original_title,
      overview: response.data.overview,
      poster_path: response.data.poster_path,
      release_date: response.data.release_date,
      runtime: response.data.runtime,
      spoken_languages: response.data.spoken_languages,
      vote_average: response.data.vote_average,
      favorite,
    };
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
