import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../componets/Loading";
import MovieCard from "../componets/MovieCard";
import Pagination from "../componets/Pagination";
import { useGlobalContext } from "../context";

const MyList = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [movies, setMovise] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 8;
  useEffect(() => {
    const getMoviess = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/mylist/?page=${page}&limit=${limit}`,
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setMovise(response.data.results.movies);
        setTotal(response.data.results.total);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (user) {
      getMoviess();
    }
  }, [user, page, total]);

  if (loading) {
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
      <h1
        style={{
          margin: "20px auto 30px",
          display: "block",
          color: "#e0e0e0",
        }}
      >
        {user ? "My list" : "You must be logged first"}
      </h1>
      <div className="container">
        {!movies.length && user ? (
          <h2>There is no movies</h2>
        ) : (
          movies.map((movie) => {
            return <MovieCard key={movie.id} {...movie} />;
          })
        )}
      </div>
      {total > limit && (
        <Pagination total={total} setPage={setPage} page={page} limit={limit} />
      )}
    </div>
  );
};

export default MyList;
