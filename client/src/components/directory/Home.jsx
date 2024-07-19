import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                  }}
                >
                <div className="overlay">
                  <div className="overlay-content">
                    <div className="overlay-info">
                      <h2 className='overlayTitle'>{movie.title}</h2>
                        <div className='overlayBtn'>
                          <Link className="mLink" to={`/movies/${movie.id}`}>
                            <button className="button-Get-Tickets">
                              See More Info
                            </button>
                          </Link>
                        </div>
                        <div className="overlayDots">
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
              {/* <div className="haWrapper">
                <div className="haContainer">
                  <div className="haContent">
                    <div className="home-account-info">
                      <div className="info-box">
                        <h2>Why register for an account?</h2>
                        <ul>
                        <p><b>Save tickets & orders:</b> <br></br>
                          Tickets and snacks are stored in your account, accessible at the push of a button.</p>
                          <p><b>Save payment methods:</b> 
                          <br></br>Checkout is a breeze by saving your credit card to your account.</p>
                          <p><b>Earn and redeem rewards:</b> 
                          <br></br>Redeem your points for exclusive rewards and experiences.</p>
                          <p><b>Suggestions based on you:</b>
                          <br></br>Based on past orders, we can recommend movies you and your preferences.</p>
                          <p><b>Manage your account:</b>
                          <br></br>Update your account information, change your password, and more.</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
      </div>
    </div>
  );
}

export default Home;