import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../componets/Loading";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "../context";

const Movie = () => {
  const { id } = useParams();
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [movie, setMovie] = useState("");
  let url = `http://localhost:5000/api/movie/${id}`;
  if (user) {
    url = `http://localhost:5000/api/movie/auth/${id}`;
  }
  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: { authorization: localStorage.getItem("token") },
        });
        setMovie(response.data.movie);
        setFavorite(response.data.movie.favorite);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getMovie();
  }, [id]);

  const addToMyList = async (id) => {
    if (user) {
      await axios
        .post(
          "http://localhost:5000/api/mylist",
          {
            id,
            original_title: movie.original_title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            favorite: true,
          },
          { headers: { authorization: localStorage.getItem("token") } }
        )
        .then((res) => setFavorite(res.data.favorite))
        .catch((err) => console.log(err));
    }
  };

  const removeFromMyList = async (id) => {
    if (user) {
      await axios
        .delete(
          `http://localhost:5000/api/mylist/${id}`,
          {
            headers: { authorization: localStorage.getItem("token") },
          },
          {}
        )
        .then((res) => setFavorite(res.data.favorite))
        .catch((err) => console.log(err));
    }
  };

  if (loading) {
    return <Loading />;
  }
  const {
    movieId,
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
        {!favorite ? (
          <button className="btn" onClick={() => addToMyList(movieId)}>
            Add to favorites
          </button>
        ) : (
          <button className="btn" onClick={() => removeFromMyList(movieId)}>
            Remove from favorites
          </button>
        )}
      </div>
    </section>
  );
};

export default Movie;
