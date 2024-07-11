import React from "react";
import "./ShowtimesModal.css";

const ShowtimesModal = ({ showtimes, onClose }) => {
  console.log("Rendering modal with showtimes:", showtimes);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Showtimes</h2>
        {showtimes.length > 0 ? (
          <ul>
            {showtimes.map((showtime) => (
              <li key={showtime.id}>
                {new Date(showtime.times).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No showtimes available.</p>
        )}
      </div>
    </div>
  );
};

export default ShowtimesModal;
