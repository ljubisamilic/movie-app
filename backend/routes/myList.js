const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.total = await Movie.countDocuments().exec();

  try {
    results.movies = await Movie.find({ createdBy: req.user.id })
      .limit(limit)
      .skip(startIndex)
      .exec();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    await Movie.create(req.body);
    return res
      .status(200)
      .json({ msg: "Movie added", favorite: req.body.favorite });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndRemove({
      id: req.params.id,
      createdBy: req.user.id,
    });
    if (!movie) {
      return res
        .status(400)
        .json({ msg: `Theres is no movie with id ${req.params.id}` });
    }
    return res.status(200).json({ favorite: false });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
