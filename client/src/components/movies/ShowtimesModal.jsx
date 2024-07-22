import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ShowtimesModal.css";

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
        alert("Reservation successful!"); // Showing success alert
        onClose();  // Closing modal after successful reservation
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
          <ul>
            {showtimes.map((showtime) => (
              <li key={showtime.id}>
                {new Date(showtime.times).toLocaleString()}
                <div>
                  <label htmlFor="ticketType">Select Ticket Type:</label>
                  <select
                    id="ticketType"
                    value={selectedTicketType}
                    onChange={handleTicketTypeChange}
                  >
                    <option value="general">General Admission</option>
                    <option value="carpass">Car Pass</option>
                  </select>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                  />
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
