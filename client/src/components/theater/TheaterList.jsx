import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TheaterList() {
  const [Theater, setTheaters] = useState([]);
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/theater");
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <div className="theater-list-container">
      <h1 className="theater-list-heading">THEATERS</h1>
      <div className="theater-cards-wrapper">
        {Theater.map((theater) => (
          <div className="theater-card" key={theater.id}>
            <h2 className="theater-location">{theater.Location}</h2>
            <p className="theater-address">{theater.Address}</p>
            <p className="theater-email">{theater.email}</p>
            <Link to={`/theater/${theater.id}`}>
              <button className="theater-more-info-btn">More Info</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
