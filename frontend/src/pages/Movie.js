import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../componets/Loading";
import { FaStar } from "react-icons/fa";

const Movie = () => {
  const { id } = useParams();
  const [loadgin, setLoading] = useState(true);
  const [movie, setMovie] = useState("");
  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movie/${id}`
        );
        console.log("some");
        setMovie(response.data.movie);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    console.log("nesto");
    getMovie();
  }, [id]);

  if (loadgin) {
    return <Loading />;
  }
  const {
    genres,
    original_title,
    overview,
    poster_path,
    release_date,
    runtime,
    spoken_languages,
    vote_average,
  } = movie;

  return (
    <section className="movie-container">
      <img
        src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
        alt={original_title}
      />
      <div className="movie-details">
        <h2 className="movie-title">
          {original_title} <span>({release_date.split("-")[0]})</span>
        </h2>
        <p className="category">
          {release_date}{" "}
          <span className="genre">
            {genres.map((genre) => {
              return (
                <a href="#" key={genre.id}>
                  {genre.name}{" "}
                </a>
              );
            })}
          </span>
          <span className="ruintime"> {runtime}m</span>
        </p>
        <h3 className="rating">
          TMDb Rating:{" "}
          <span>
            <FaStar className="star-icon" />
            {vote_average}
          </span>
        </h3>
        <div className="description">
          <h4>Description: </h4>
          <p>{overview}</p>
        </div>
        <div className="languages">
          <h4>Spoken languages: </h4>
          <p>
            {spoken_languages.map((lang, index) => {
              return <span key={index}>{lang.name ? lang.name : ""} </span>;
            })}
          </p>
        </div>
        <button className="btn">Add to favorites</button>
        <button className="btn">Remove from favorites</button>
      </div>
    </section>
  );
};

export default Movie;
