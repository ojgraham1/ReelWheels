import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ShowtimesModal from "./ShowtimesModal";

const MovieList = () => {
  const [movieSlide, setMovieSlide] = useState([]); // State variable to hold movie slide
  const [movies, setMovies] = useState([]); // State to store movies fetched from API
  const [showtimes, setShowtimes] = useState([]); // State to store showtimes for a selected movie
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [movieSlide, setMovieSlide] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 5000;


  // Fetching movies from API
  useEffect(() => {
    // slideshow
    const fetchMovieSlide = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        setMovieSlide(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // movie list
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        const movies = response.data;

        // Get user's current location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch showtimes for the nearest theater for each movie
          const moviesWithShowtimes = await Promise.all(
            movies.map(async (movie) => {
              const response = await axios.post(
                "http://localhost:3000/showtimes/nearest",
                { latitude, longitude, movieId: movie.id }
              );
              return { ...movie, showtimes: response.data };
            })
          );

          // Sort movies based on whether they have showtimes
          moviesWithShowtimes.sort(
            (a, b) => b.showtimes.length - a.showtimes.length
          );
          setMovies(moviesWithShowtimes);
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovieSlide();
    fetchMovies();
  }, []);

<<<<<<< HEAD
   // Timeout delay for automatic slideshow of movie slides
  const delay = 5000;
  // State and ref to manage index for movie slides
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef(null);

    // Function to reset the slideshow timeout
  function resetTimeout() {
=======
  const resetTimeout = () => {
>>>>>>> TG10
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === movieSlide.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, movieSlide.length]);

  const handleGetTicketsClick = async (movieId) => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => { // Getting current geolocation coordinates
        const { latitude, longitude } = position.coords; // getting latitude and longitude

        const response = await axios.post(
          `http://localhost:3000/showtimes/nearest`,
          { latitude, longitude, movieId }
        ); // Sending POST request to fetch nearest showtimes for the movie

        setShowtimes(response.data); // Setting fetched showtimes
        setIsModalOpen(true); // Opening the modal to display showtimes
      });
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };
  
   // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowtimes([]);
  };

  return (
    <div className="mLContainer">
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {movieSlide.map((movie, idx) => (
            <div
              className="slide"
              key={idx}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="overlay">
                <div className="overlay-content">
                  <div className="overlay-info">
                    <h2 className="overlayTitle">{movie.title}</h2>
                    <div className="overlayBtn">
                      <Link className="mLink" to={`/movies/${movie.id}`}>
                        <button className="button-Get-Tickets">
                          See More Info
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="overlayDots">
          <div className="slideshowDots">
            {movieSlide.map((_, idx) => (
              <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <ul className="movie-list-container">
        <div className="mLWrapper">
          <h1 className="mLHeading">IN THEATERS NOW</h1>
          <div className="mlCard-Container">
            {movies.map((movie) => (
              <div className="mlCard" key={movie.id}>
                <ul className="mlCardWrapper">
                  <div className="mLImg-Container">
                    <img
                      className="mLImg"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="mLText-Container">
                    <h2 className="mLT">{movie.title}</h2>
                    <p className="mLO">{movie.overview}</p>
                    <div className="buttonGT">
                      {movie.showtimes.length > 0 && (
                        <button
                          className="button-Get-Tickets"
                          onClick={() => handleGetTicketsClick(movie.id)}
                        >
                          <FontAwesomeIcon icon={faTicket} /> Get Tickets
                        </button>
                      )}
                      <div className="mLBtn">
                        <Link className="mLink" to={`/movies/${movie.id}`}>
                          <button className="mv-btn-link">
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ul>
      {isModalOpen && (
        <ShowtimesModal showtimes={showtimes} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MovieList;
