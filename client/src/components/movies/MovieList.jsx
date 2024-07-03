import { useEffect, useState } from "react";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="mLContainer">
      <ul className="movie-list-container">
        <h1 className="mLHeading">IN THEATERS NOW</h1>
        <div className="mLWrapper">
          <div className="mlCard-Container">
            {movies.map((movie) => (
              <div className="mlCard">
                <ul className="mlCardWrapper" key={movie.id}>
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
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default MovieList;
