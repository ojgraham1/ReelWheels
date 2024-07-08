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
  });
  return (
    <div className="tContainer">
      <ul className="theater-container">
        <h1 className="tHeading">THEATERS</h1>
        <div className="tWrapper">
          <div className="tCard-Container">
            {Theater.map((theater) => (
              <div className="tCard" key={theater.id}>
                <ul className="tCardWrapper">
                  <div className="tText-Container">
                    <h2 className="tLocation">{theater.Location}</h2>
                    <p className="tAddress">{theater.Address}</p>
                    <p className="tEmail">{theater.email}</p>
                    <Link to={`/theater/${theater.id}`}>
                      <button className="tMoreInfoBut">More Info</button>
                    </Link>
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
