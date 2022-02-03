import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

  const handleSearch = async (e) => {
    e.preventDefault();
    const newQuery = removeExtraSpace(query);
    setQuery("");
    if (newQuery.length) {
      await axios
        .get(`http://localhost:5000/api/movie/search/?queryy=${newQuery}`)
        .then((response) => {
          navigate("/search", { state: { movies: response.data.movies } });
        });
    }
  };
  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-search">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
