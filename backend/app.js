const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const Movie = require("./models/movies");
require("dotenv").config();

const movieRoute = require("./routes/movie");
const myListRoute = require("./routes/myList");
const userRoute = require("./routes/users");
app.use(cors());

app.use(express.json());

app.use("/api/movie", movieRoute);
app.use("/api/mylist", myListRoute);
app.use("/api/user", userRoute);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ljubisa:srbija98.@reactexpress.vubvn.mongodb.net/movies?retryWrites=true&w=majority"
    );
    app.listen(5000, () => console.log("Server up!"));
  } catch (error) {
    console.log(error);
  }
};
start();
