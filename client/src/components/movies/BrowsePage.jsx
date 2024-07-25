import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from "react-youtube";
import Snackbar from '@mui/material/Snackbar';

function BrowsePage() {
    const { id } = useParams(); // Extracting 'id' parameter from URL using useParams hook

    // State variables to manage video key, movie details, loading state, and Snackbar visibility
    const [videoKey, setVideoKey] = useState(null);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

     // Function to fetch movie data using 'id' parameter from API
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=60bff7c4b3bc017974f0186538e281a6&append_to_response=videos`);
                const data = await response.json();

                // Finding the trailer from the results and setting the video key
                const trailer = data.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setVideoKey(trailer ? trailer.key : null); // Setting video key if trailer is found

                setDetails(data); // Setting movie details
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching data for ID ${id}:`, error);
                setLoading(false);
            }
        };

        fetchMovieData(); // Invoking fetchMovieData function when 'id' or 'setDetails' changes
    }, [id]);

     // Function to format date into a readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const [open, setOpen] = useState(false);

 // Function to add movie to watchlist
    const addToWatchlist = () => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist.push(details);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        setOpen(true);
    };

    // Function to handle Snackbar close event
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    
    if (loading) return <p>Loading...</p>;

    return (
        <div
            className="browse-page-container"
            style={{
                className: 'bpImg',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`
            }}
        >
            <div className="browse-page-overlay"></div>
            {details && (
                <div className="browse-page-content">
                    <div className="bvid-content">
                        <div className="bpVideo-Container">
                            <div className="bvid">
                                {videoKey && <YouTube videoId={videoKey} />}
                            </div>
                        </div>
                    </div>
                    <div className="bpInfo">
                        <div className="bpText-Container">
                            <h1 className="bpTitle">{details.title}</h1>
                            <h4>Released {formatDate(details.release_date)}</h4>
                            <h5>Vote Rating: {details.vote_average} | Language: {details.original_language}</h5>
                            <p>{details.overview}</p>
                            <button className='atwBtn' onClick={addToWatchlist}>Add to Watchlist</button>
                                <Snackbar
                                    className='atwNotif'
                                    open={open}
                                    autoHideDuration={2000}
                                    onClose={handleClose}
                                    message="Added to Watchlist!"
                                />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BrowsePage;
