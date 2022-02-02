const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
