import React, { useState, useEffect } from 'react';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]); // State to hold watchlist items

    useEffect(() => {
        // Fetch watchlist from local storage on component mount
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
         // Filter out duplicate items based on 'id' using Set and Array.from
        const uniqueWatchlist = Array.from(new Set(savedWatchlist.map(item => item.id)))
            .map(id => savedWatchlist.find(item => item.id === id));
             // Set watchlist state with unique items
        setWatchlist(uniqueWatchlist);
    }, []);

      // Function to remove item from watchlist
    const removeFromWatchlist = (id) => {
        const updatedWatchlist = watchlist.filter(item => item.id !== id); // Filter out item by id
        setWatchlist(updatedWatchlist); // Update watchlist state
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    return (
        <div className="watchlistWrapper">
            <div className="watchlist-page-container">
                <h1 className='wlHead'>Your Watchlist</h1>
                {watchlist.length === 0 ? (
                    <div className="wlMsg">
                        <p className='msg'>No items in your watchlist.</p>
                    </div>
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
