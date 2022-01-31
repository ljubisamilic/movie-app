import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  removeFavMovie,
}) => {
  // const location = useLocation().pathname;
  return (
    <div className="movie-card">
      {/* {location ==='/favorite'?  <div className='close' onClick={() => removeFavMovie(id)}>X</div> :null} */}
      <div className="shadow"></div>
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={title}
        />
      </Link>
      <div className="movie-info">
        <h3>{title}</h3>
        <span>{vote_average}</span>
      </div>
    </div>
  );
};

export default MovieCard;
