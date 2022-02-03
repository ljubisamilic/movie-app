import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../componets/Loading";
import MovieCard from "../componets/MovieCard";

const Upcoming = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovise] = useState([]);

  useEffect(() => {
    const getMovise = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:5000/api/movie/upcoming")
        .then((res) => setMovise(res.data.movies))
        .catch((err) => console.log(err));
      setLoading(false);
    };
    getMovise();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          margin: "20px auto 30px",
          display: "block",
          color: "#e0e0e0",
        }}
      >
        Upcoming movies
      </h1>
      <div className="container">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
};

export default Upcoming;
