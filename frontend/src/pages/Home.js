import React from "react";
import MovieList from "../componets/MovieList";
import SearchBox from "../componets/SearchBox";

const Home = () => {
  return (
    <>
      <SearchBox />
      <MovieList />
    </>
  );
};

export default Home;
