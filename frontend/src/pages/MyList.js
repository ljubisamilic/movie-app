import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../componets/Loading";
import MovieCard from "../componets/MovieCard";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovise] = useState([]);

  useEffect(() => {
    const getMoviess = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/mylist", {
          headers: { authorization: localStorage.getItem("token") },
        });
        setMovise(response.data.movies);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getMoviess();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="container">
        {!movies.length ? (
          <h2>There is no movies</h2>
        ) : (
          movies.map((movie) => {
            return <MovieCard key={movie.id} {...movie} />;
          })
        )}
      </div>
    </div>
  );
};

export default MyList;
