import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ShowtimesModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const ShowtimesModal = ({ showtimes, onClose }) => {
  const [selectedTicketType, setSelectedTicketType] = useState("general"); // State to manage selected ticket type
  const [quantity, setQuantity] = useState(1); // State to manage ticket quantity
  const userId = useSelector((state) => state.auth.userId); // Extracting userId
  const token = useSelector((state) => state.auth.token); // Extracting token

  // Handler to update selected ticket type
  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  // Handler to update ticket quantity
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

    // Handler to reserve tickets
  const handleReserveTickets = async (showtimeId) => {
    try {
          // Logging reservation data to console
      console.log("Sending reservation data:", {
        userId,
        quantity,
        ticketType: selectedTicketType,
        showtime_id: showtimeId,
      });
      // Sending reservation request to server
      const response = await fetch(
        `/reservations/user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity,
            ticketType: selectedTicketType,
            showtime_id: showtimeId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Reservation successful!"); // Showing success alert
        onClose();  // Closing modal after successful reservation
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error reserving tickets:", error);
      alert("Please create an account to reserve your tickets.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Showtimes</h2>
        {showtimes.length > 0 ? (
          <ul className="modal-showtime-list">
            {showtimes.map((showtime) => (
              <li key={showtime.id} className="modal-showtime-item">
                <div className="modal-showtime-box">
                  {new Date(showtime.times).toLocaleString([], {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div className="modal-showtime-details">
                  <div>
                    <label htmlFor="ticketType">Ticket Type:</label>
                    <select
                      id="ticketType"
                      value={selectedTicketType}
                      onChange={handleTicketTypeChange}
                    >
                      <option value="general">General Admission</option>
                      <option value="carpass">Car Pass</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={selectedTicketType === "carpass" ? "1" : undefined}
                    />
                  </div>
                  <button
                    onClick={() => handleReserveTickets(showtime.id)}
                    className="modal-button"
                  >
                    Reserve
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No showtimes available.</p>
        )}
        <div className="modal-filler-message">
          <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
          Please note that your spot is not fully guaranteed until your ticket
          is purchased at the drive-in.
        </div>
      </div>
    </div>
  );
};

export default ShowtimesModal;
