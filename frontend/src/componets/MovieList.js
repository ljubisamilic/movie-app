import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovise] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/movie");
        if (response.data) {
          setMovise(response.data.movies);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="container">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
};

export default MovieList;
