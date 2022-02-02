import React from "react";
import { Link, useLocation } from "react-router-dom";

const MovieCard = ({
  id,
  poster_path,
  original_title,
  vote_average,
  removeFavMovie,
}) => {
  const location = useLocation().pathname;
  return (
    <div className="movie-card">
      {location === "/my-list" ? (
        <button className="close" onClick={() => removeFavMovie(id)}>
          X
        </button>
      ) : null}
      <div className="shadow"></div>
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={original_title}
        />
      </Link>
      <div className="movie-info">
        <h3>{original_title}</h3>
        <span>{vote_average}</span>
      </div>
    </div>
  );
};

export default MovieCard;
