import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

function MoviePage() {
    const { id } = useParams();
    const [videoKey, setVideoKey] = useState(null);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=60bff7c4b3bc017974f0186538e281a6&append_to_response=videos`);
                const data = await response.json();

                const trailer = data.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setVideoKey(trailer ? trailer.key : null);
                
                setDetails(data);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching data for ID ${id}:`, error);
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="mmpContainer">
            <div
                className="movie-page-container"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`
                }}
            >
                <div className="movie-page-overlay"></div>
                {details && (
                    <div className="movie-page-content">
                        <div className="vid-content">
                            <div className={`mpVideo-Container ${showTrailer ? 'show' : 'exit'}`}>
                                <div className="vid">
                                    {videoKey && <YouTube videoId={videoKey} />}
                                </div>
                            </div>
                        </div>
                        <div className="mpInfo">
                            <div className="trailer-section">
                                <button 
                                    className="watch-trailer-button" 
                                    onClick={() => setShowTrailer(!showTrailer)}
                                    >
                                    <FontAwesomeIcon className='play-btn' icon= {faCirclePlay} />
                                    {showTrailer ? "" : ""}
                                </button>
                            </div>
                            <div className="mpText-Container">
                                <h1 className="mpTitle">{details.title}</h1>
                                <h4 className='mpt'>Released {formatDate(details.release_date)}</h4>
                                <h5 className='mpt'>Vote Rating: {details.vote_average} | Language: {details.original_language}</h5>
                                <p className='mpp'>{details.overview}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mpShowtimes-Container">
                <h1>Hellooooo Sunshine!</h1>
            </div>
        </div>
    );
}

export default MoviePage;