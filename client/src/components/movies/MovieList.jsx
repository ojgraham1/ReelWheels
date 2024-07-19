import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ShowtimesModal from "./ShowtimesModal";
import DateTime from "../directory/DateTime";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleGetTicketsClick = async (movieId) => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(
          `Fetching showtimes for movie ID: ${movieId} at (${latitude}, ${longitude})`
        );
        const response = await axios.post(
          `http://localhost:3000/showtimes/nearest`,
          { latitude, longitude, movieId }
        );
        console.log("Showtimes fetched:", response.data);
        setShowtimes(response.data);
        setIsModalOpen(true);
      });
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setShowtimes([]);
  };

  return (
    <div className="mLContainer">
      <ul className="movie-list-container">
        <h1 className="mLHeading">IN THEATERS NOW</h1>
        <div className="mLWrapper">
          {/* <div className="mlDateTime">
            <DateTime />
          </div> */}
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
                      <button
                        className="button-Get-Tickets"
                        onClick={() => handleGetTicketsClick(movie.id)}
                      >
                        <FontAwesomeIcon icon={faTicket} /> Get Tickets
                      </button>
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
