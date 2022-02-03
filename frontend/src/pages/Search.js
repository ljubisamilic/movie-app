import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBox from "../componets/SearchBox";
import MovieCard from "../componets/MovieCard";
const Search = () => {
  const location = useLocation();
  const results = location.state ? location.state.movies : [];
  const [movies, setMovies] = useState(results);
  useEffect(() => {
    setMovies(results);
  }, [results]);
  return (
    <>
      <SearchBox />
      {!movies.length ? (
        <h2 className="text-center">
          Sorry, your search returned zero results
        </h2>
      ) : (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} {...movie} />;
          })}
        </div>
      )}
    </>
  );
};

export default Search;
