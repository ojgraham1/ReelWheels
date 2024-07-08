import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TheaterPage() {
  const [Theater, setTheaters] = useState([]);
  useEffect(() => {
    const fetchTheaterById = async () => {
      try {
        const response = await axios.get("http://localhost:3000/theater/{$id}");
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching single theater:", error);
      }
    };
    fetchTheaterById();
    return (
      <div className="singleTContainer">
        <ul className="single-theater-container">
          <h1 className="singleTHeading">THEATERS</h1>
          <div className="singleTWrapper">
            <div className="single-tCard-Container">
              {Theater.map((theater) => (
                <div className="singleTCard">
                  <ul className="singleTCardWrapper" key={theater.id}>
                    <div className="singleTText-Container">
                      <h2 className="singleTLocation">{theater.Location}</h2>
                      <p className="singleTAddress">{theater.Address}</p>
                      <p className="singleTCapacity">{theater.Capacity}</p>
                      <p className="singleTEmail">{theater.email}</p>
                      <Link to={"/theaters"}>
                        <button className="tBackBut">Back to List</button>
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
  });
}

export default TheaterPage;