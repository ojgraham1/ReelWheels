import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from "react-youtube";

function BrowseTvPage() {
    const { id } = useParams();
    const [videoKey, setVideoKey] = useState(null);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=60bff7c4b3bc017974f0186538e281a6&append_to_response=videos`);
                const data = await response.json();

                const trailer = data.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setVideoKey(trailer ? trailer.key : null);

                setDetails(data);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching data for Tv ID ${id}:`, error);
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
        <div
            className="browse-page-container"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`
            }}
        >
            <div className="browse-page-overlay"></div>
            {details && (
                <div className="browse-page-content">
                    <div className="bpVideo-Container">
                        {videoKey && <YouTube videoId={videoKey} />}
                    </div>
                    <div className="bpInfo">
                        <div className="bpText-Container">
                            <h1 className="bpTitle">{details.name}</h1>
                            <h4>First Aired {formatDate(details.first_air_date)}</h4>
                            <h5>Vote Rating: {details.vote_average} | Language: {details.original_language}</h5>
                            <p>{details.overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BrowseTvPage;