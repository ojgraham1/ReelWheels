import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Browse() {
    const [browseMovies, setBrowseMovies] = useState([]);
    const [browseTopRated, setBrowseTopRated] = useState([]);
    const [browseTv, setBrowseTv] = useState([]);
    const [browseUpcoming, setBrowseUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("movies");

    // Fetch Movies
    const fetchMovies = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?&page=5&api_key=60bff7c4b3bc017974f0186538e281a6")
            .then(res => res.json())
            .then(json => {
                setBrowseMovies(json.results);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                setLoading(false);
            });
    };

    // Fetch Top-Rated Movies
    const fetchTopRated = () => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?&api_key=60bff7c4b3bc017974f0186538e281a6")
            .then(res => res.json())
            .then(json => {
                setBrowseTopRated(json.results);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching Top-Rated movies:", error);
                setLoading(false);
            });
    };

    // Fetch TV Shows
    const fetchTv = () => {
        fetch("https://api.themoviedb.org/3/discover/tv?page=4&api_key=60bff7c4b3bc017974f0186538e281a6")
            .then(res => res.json())
            .then(json => {
                setBrowseTv(json.results);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching TV shows:", error);
                setLoading(false);
            });
    };
        // Fetch Upcoming Movies
        const fetchUpcoming = () => {
            fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=60bff7c4b3bc017974f0186538e281a6")
                .then(res => res.json())
                .then(json => {
                    setBrowseUpcoming(json.results);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching Upcoming movies:", error);
                    setLoading(false);
                });
        };
    
    useEffect(() => {
        fetchMovies();
        fetchTopRated();
        fetchTv();
        fetchUpcoming();
    }, []);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="bmContainer">
            <div className="browse-movies-container">
                <h1 className="bmHeading">Browse Our Library</h1>
                <div className="category-nav">
                    <button
                        className={`category-btn ${activeCategory === "movies" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("movies")}
                    >
                        Movies
                    </button>
                    <button
                        className={`category-btn ${activeCategory === "topRated" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("topRated")}
                    >
                        Top Rated
                    </button>
                    <button
                        className={`category-btn ${activeCategory === "tv" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("tv")}
                    >
                        TV Shows
                    </button>
                    <button
                        className={`category-btn ${activeCategory === "upcoming" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("upcoming")}
                    >
                        Upcoming
                    </button>

                </div>
                {loading && <p>Loading...</p>}
                {!loading && (
                    <div className="bmWrapper">
                        <div className="bmCard-Container">
                            {activeCategory === "movies" && browseMovies.map((movie) => (
                                <div className="bmCard" key={movie.id}>
                                    <div className="bmImg-Container">
                                        <Link to={`/browse/${movie.id}`}>
                                            <img className="bmImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        </Link>
                                    </div>
                                    <div className="bmInfo">
                                        <div className="bmText-Container">
                                            <div className="bmText">
                                                <h3 className="bmT">{movie.title}</h3>
                                            </div>
                                            <div className="bmButt">
                                                <Link className="link" to={`/browse/${movie.id}`}>
                                                    <button className="brws-btn-link"><FontAwesomeIcon icon={faCircleInfo} /></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {activeCategory === "topRated" && browseTopRated.map((movie) => (
                                <div className="bmCard" key={movie.id}>
                                    <div className="bmImg-Container">
                                        <Link to={`/browse/${movie.id}`}>
                                            <img className="bmImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        </Link>
                                    </div>
                                    <div className="bmInfo">
                                        <div className="bmText-Container">
                                            <div className="bmText">
                                                <h3 className="bmT">{movie.title}</h3>
                                            </div>
                                            <div className="bmButt">
                                                <Link className="link" to={`/browse/${movie.id}`}>
                                                    <button className="brws-btn-link"><FontAwesomeIcon icon={faCircleInfo} /></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {activeCategory === "tv" && browseTv.map((tv) => (
                                <div className="bmCard" key={tv.id}>
                                    <div className="bmImg-Container">
                                        <Link to={`/browse/${tv.id}`}>
                                            <img className="bmImg" src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.original_name} />
                                        </Link>
                                    </div>
                                    <div className="bmInfo">
                                        <div className="bmText-Container">
                                            <div className="bmText">
                                                <h3 className="bmT">{tv.original_name}</h3>
                                            </div>
                                            <div className="bmBtn">
                                                <Link className="link" to={`/browse/tv/${tv.id}`}>
                                                    <button className="brws-btn-link"><FontAwesomeIcon icon={faCircleInfo} /></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {activeCategory === "upcoming" && browseUpcoming.map((movie) => (
                                <div className="bmCard" key={movie.id}>
                                    <div className="bmImg-Container">
                                        <Link to={`/browse/${movie.id}`}>
                                            <img className="bmImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        </Link>
                                    </div>
                                    <div className="bmInfo">
                                        <div className="bmText-Container">
                                            <div className="bmText">
                                                <h3 className="bmT">{movie.title}</h3>
                                            </div>
                                            <div className="bmButt">
                                                <Link className="link" to={`/browse/${movie.id}`}>
                                                    <button className="brws-btn-link"><FontAwesomeIcon icon={faCircleInfo} /></button>
                                                </Link>
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
    );
}

export default Browse;

{/* <FontAwesomeIcon icon="fa-solid fa-plus" /> */}
{/* <FontAwesomeIcon icon="fa-solid fa-check" /> */}