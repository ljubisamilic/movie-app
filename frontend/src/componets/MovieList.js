import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [movies, setMovise] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movie/?page=${page}`
        );
        if (response.data) {
          setMovise((movie) => {
            return [...movie, ...response.data.movies];
          });
        }
      } catch (error) {
        console.log(error);
      }
      setFirstLoading(false);
      setLoading(false);
    };
    getMovies();
  }, [page]);

  if (firstLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="container">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
      {movies.length && (
        <button
          className="btn"
          onClick={() => setPage(page + 1)}
          style={{ margin: "30px auto", width: "300px" }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default MovieList;
