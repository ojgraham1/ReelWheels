import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPlus,
  faCheck,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SearchBar from "../directory/SearchBar";

function Browse() {
  // State variables for different categories and loading state
  const [browseMovies, setBrowseMovies] = useState([]);
  const [browseTopRated, setBrowseTopRated] = useState([]);
  const [browseTv, setBrowseTv] = useState([]);
  const [browseUpcoming, setBrowseUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("movies"); // Default active category
  const [watchlist, setWatchlist] = useState(
    // Retrieve watchlist from local storage
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page state

  // Function to fetch items based on category and page number
  const fetchItems = (category, page = 1) => {
    let url = "";
    switch (category) {
      case "movies":
        url = `https://api.themoviedb.org/3/discover/movie?&page=${page}&api_key=60bff7c4b3bc017974f0186538e281a6`;
        break;
      case "topRated":
        url = `https://api.themoviedb.org/3/movie/top_rated?&page=${page}&api_key=60bff7c4b3bc017974f0186538e281a6`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/discover/tv?&page=${page}&api_key=60bff7c4b3bc017974f0186538e281a6`;
        break;
      case "upcoming":
        url = `https://api.themoviedb.org/3/movie/upcoming?&page=${page}&api_key=60bff7c4b3bc017974f0186538e281a6`;
        break;
      default:
        break;
    }

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        switch (category) {
          case "movies":
            setBrowseMovies(json.results);
            break;
          case "topRated":
            setBrowseTopRated(json.results);
            break;
          case "tv":
            setBrowseTv(json.results);
            break;
          case "upcoming":
            setBrowseUpcoming(json.results);
            break;
          default:
            break;
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${category} items:`, error);
        setLoading(false);
      });
  };

  // Function to handle category change
  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setCurrentPage(1);
      setLoading(true);
    }
  };

  // Function to toggle item in watchlist
  const toggleWatchlist = (item) => {
    const isInWatchlist = watchlist.some(
      (watchlistItem) => watchlistItem.id === item.id
    );
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter((watchlistItem) => watchlistItem.id !== item.id)
      : [...watchlist, item];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  // Function to check if item is in watchlist
  const isItemInWatchlist = (id) => {
    return watchlist.some((item) => item.id === id);
  };

  // Effect to fetch data on component mount and when currentPage or activeCategory changes
  useEffect(() => {
    fetchItems(activeCategory, currentPage);
  }, [currentPage, activeCategory]);

  const [results, setResults] = useState([]);

  return (
    <div className="browseSearchBar">
      <SearchBar setResults={setResults} />;
      <div className="bmContainer">
        <div className="browse-movies-container">
          <h1 className="bmHeading">Browse Our Library</h1>
          <div className="category-nav">
            <button
              className={`category-btn ${
                activeCategory === "movies" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("movies")}
              disabled={activeCategory === "movies"}
            >
              Movies
            </button>
            <button
              className={`category-btn ${
                activeCategory === "topRated" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("topRated")}
              disabled={activeCategory === "topRated"}
            >
              Top Rated
            </button>
            <button
              className={`category-btn ${
                activeCategory === "tv" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("tv")}
              disabled={activeCategory === "tv"}
            >
              TV Shows
            </button>
            <button
              className={`category-btn ${
                activeCategory === "upcoming" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("upcoming")}
              disabled={activeCategory === "upcoming"}
            >
              Upcoming
            </button>
          </div>
          {loading && <p>Loading...</p>}
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="pagination-page">Page {currentPage}</span>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {!loading && (
            <div className="bmWrapper">
              <div className="bmCard-Container">
                {activeCategory === "movies" &&
                  browseMovies.map((movie) => (
                    <div className="bmCard" key={movie.id}>
                      <div className="bmImg-Container">
                        <Link to={`/browse/${movie.id}`}>
                          <img
                            className="bmImg"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </Link>
                      </div>
                      <div className="bmInfo">
                        <div className="bmText-Container">
                          <div className="bmText">
                            <h3 className="bmT">{movie.title}</h3>
                          </div>
                          <div className="bmButt">
                            <Link className="link" to={`/browse/${movie.id}`}>
                              <button className="brws-btn-link">
                                <FontAwesomeIcon icon={faCircleInfo} />
                              </button>
                            </Link>
                            <button
                              className="watchlist-btn"
                              onClick={() => toggleWatchlist(movie)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  isItemInWatchlist(movie.id) ? faCheck : faPlus
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {activeCategory === "topRated" &&
                  browseTopRated.map((movie) => (
                    <div className="bmCard" key={movie.id}>
                      <div className="bmImg-Container">
                        <Link to={`/browse/${movie.id}`}>
                          <img
                            className="bmImg"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </Link>
                      </div>
                      <div className="bmInfo">
                        <div className="bmText-Container">
                          <div className="bmText">
                            <h3 className="bmT">{movie.title}</h3>
                          </div>
                          <div className="bmButt">
                            <Link className="link" to={`/browse/${movie.id}`}>
                              <button className="brws-btn-link">
                                <FontAwesomeIcon icon={faCircleInfo} />
                              </button>
                            </Link>
                            <button
                              className="watchlist-btn"
                              onClick={() => toggleWatchlist(movie)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  isItemInWatchlist(movie.id) ? faCheck : faPlus
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {activeCategory === "tv" &&
                  browseTv.map((tv) => (
                    <div className="bmCard" key={tv.id}>
                      <div className="bmImg-Container">
                        <Link to={`/browse/tv/${tv.id}`}>
                          <img
                            className="bmImg"
                            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                            alt={tv.original_name}
                          />
                        </Link>
                      </div>
                      <div className="bmInfo">
                        <div className="bmText-Container">
                          <div className="bmText">
                            <h3 className="bmT">{tv.original_name}</h3>
                          </div>
                          <div className="bmButt">
                            <Link className="link" to={`/browse/tv/${tv.id}`}>
                              <button className="brws-btn-link">
                                <FontAwesomeIcon icon={faCircleInfo} />
                              </button>
                            </Link>
                            <button
                              className="watchlist-btn"
                              onClick={() => toggleWatchlist(tv)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  isItemInWatchlist(tv.id) ? faCheck : faPlus
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {activeCategory === "upcoming" &&
                  browseUpcoming.map((movie) => (
                    <div className="bmCard" key={movie.id}>
                      <div className="bmImg-Container">
                        <Link to={`/browse/${movie.id}`}>
                          <img
                            className="bmImg"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </Link>
                      </div>
                      <div className="bmInfo">
                        <div className="bmText-Container">
                          <div className="bmText">
                            <h3 className="bmT">{movie.title}</h3>
                          </div>
                          <div className="bmButt">
                            <Link className="link" to={`/browse/${movie.id}`}>
                              <button className="brws-btn-link">
                                <FontAwesomeIcon icon={faCircleInfo} />
                              </button>
                            </Link>
                            <button
                              className="watchlist-btn"
                              onClick={() => toggleWatchlist(movie)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  isItemInWatchlist(movie.id) ? faCheck : faPlus
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;
