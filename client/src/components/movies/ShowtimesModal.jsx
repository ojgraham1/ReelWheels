import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ShowtimesModal.css";

const ShowtimesModal = ({ showtimes, onClose }) => {
  const [selectedTicketType, setSelectedTicketType] = useState("general");
  const [quantity, setQuantity] = useState(1);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleReserveTickets = async (showtimeId) => {
    try {
      console.log("Sending reservation data:", {
        userId,
        quantity,
        ticketType: selectedTicketType,
        showtime_id: showtimeId,
      });

      const response = await fetch(
        `http://localhost:3000/reservations/user/${userId}`,
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
        alert("Reservation successful!");
        onClose();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error reserving tickets:", error);
      alert("Failed to reserve tickets.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Showtimes</h2>
        {showtimes.length > 0 ? (
          <ul className="showtime-list">
            {showtimes.map((showtime) => (
              <li key={showtime.id} className="showtime-item">
                <div className="showtime-box">
                  {new Date(showtime.times).toLocaleString([], {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div className="showtime-details">
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
                  <button onClick={() => handleReserveTickets(showtime.id)}>
                    Reserve
                  </button>
                </div>
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
