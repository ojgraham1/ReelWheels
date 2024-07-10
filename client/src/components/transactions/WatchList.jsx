import React, { useState, useEffect } from 'react';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        const uniqueWatchlist = Array.from(new Set(savedWatchlist.map(item => item.id)))
            .map(id => savedWatchlist.find(item => item.id === id));
        setWatchlist(uniqueWatchlist);
    }, []);

    const removeFromWatchlist = (id) => {
        const updatedWatchlist = watchlist.filter(item => item.id !== id);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    return (
        <div className="watchlistWrapper">
            <div className="watchlist-page-container">
                <h1>Your Watchlist</h1>
                {watchlist.length === 0 ? (
                    <p>No items in your watchlist.</p>
                ) : (
                    <div className="watchlist-items">
                        {watchlist.map((item) => (
                            <div key={item.id} className="watchlist-item">
                                <img className="wlImg" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
                                <h2 className='wlIT'>{item.title} {item.name} </h2>
                                <button className='rfwBtn' onClick={() => removeFromWatchlist(item.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Watchlist;
