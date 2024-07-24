import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchResultsList } from "./SearchResultsList.jsx";
import { TvSearchResultsList } from "./SearchResultsList.jsx";
import PropTypes from "prop-types";

export default function SearchBar() {
  const [input, setInput] = useState([]);
  const [browseResults, setBrowseResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [nowPlayingResults, setNowPlayingResults] = useState([]);
  const fetchData = (value) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=60bff7c4b3bc017974f0186538e281a6&query=${value}`
    )
      .then((response) => response.json())
      .then((json) => {
        const results = json.results.filter((bMovie) => {
          return (
            value &&
            bMovie &&
            bMovie.title &&
            bMovie.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        console.log("browseResults", results);
        setBrowseResults(results);
      });
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=60bff7c4b3bc017974f0186538e281a6&query=${value}`
    )
      .then((response) => response.json())
      .then((json) => {
        const results = json.results.filter((bTv) => {
          return (
            value &&
            bTv &&
            bTv.original_name &&
            bTv.original_name.toLowerCase().includes(value.toLowerCase())
          );
        });

        setTvResults(results);
        console.log("tv Results", results);
      });
    fetch(`/api/movies/`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((npMovie) => {
          return (
            value &&
            npMovie &&
            npMovie.title &&
            npMovie.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setNowPlayingResults(results);
        console.log("nowPlayingResults", results);
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
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            className="searchInput"
            placeholder="Search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
      <div  className="rListContainer">
        <div className="search-browse-results">
          {nowPlayingResults && nowPlayingResults.length > 0 && (
            <SearchResultsList nowPlayingResults={nowPlayingResults} />
          )}
        </div>
        <div className="search-browse-results">
          {browseResults && browseResults.length > 0 && (
            <SearchResultsList browseResults={browseResults} />
          )}
        </div>
        <div className="search-browse-results">
          {tvResults && tvResults.length > 0 && (
            <TvSearchResultsList tvResults={tvResults} />
          )}
        </div>
      </div>
    </div>
  );
}

SearchBar.PropTypesc = {
  browseResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  browseResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  tvResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
