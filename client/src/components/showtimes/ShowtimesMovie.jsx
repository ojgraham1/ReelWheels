import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ShowtimesMovie () {
    const [showtimes, setShowtimes] = useState([]);
    return (
        <div className="stContainer">
            <div className="stWrapper">
                <div className="ex">Hello Showtimes!</div>
            </div>
        </div>
    )
}

export default ShowtimesMovie;