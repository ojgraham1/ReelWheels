import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchResults } from "./SearchResults.jsx";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=60bff7c4b3bc017974f0186538e281a6&query=${value}`
    )
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((movie) => {
          return (
            value &&
            movie &&
            movie.title &&
            movie.title.toLowerCase().includes(value)
          );
        });
        console.log(results);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            placeholder="Search Bar..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
      <div className="search-results">
        <SearchResults />
      </div>
    </div>
  );
}
