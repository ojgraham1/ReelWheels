import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        setMovies(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const delay = 5000;
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, movies.length]);

  return (
    <div className="hsContainer">
        <div className="home-wrapper">
            <div className="home-container">
                <div className="slideshow">
                    <div
                        className="slideshowSlider"
                        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                    >
                        {movies.map((movie, index) => (
                        <div
                            className="slide"
                            key={index}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`                
                            // backgroundSize: 'fit',
                            }}
                        >
                            <div className="overlay">
                                <div className="overlay-content">
                                    <div className="overlay-info">
                                        <h2 className='overlayTitle'>{movie.title}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="slideshowDots">
                        {movies.map((_, idx) => (
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
                <div className='home-movies'>

                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;