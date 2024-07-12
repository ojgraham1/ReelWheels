import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function TheaterList() {
  const [Theater, setTheaters] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);

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
  const openModal = (theater) => {
    setSelectedTheater(theater);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTheater(null);
  };


  return (
    <div className={`theater-list-container ${modalIsOpen ? 'modal-open' : ''}`}>
      <h1 className="theater-list-heading">THEATERS</h1>
      <div className="theater-cards-wrapper">
        {Theater.map((theater) => (
          <div className="theater-card" key={theater.id} onClick={() => openModal(theater)}>
              <div className="tlbgImg" style={{ backgroundImage: `url(${theater.image})`}}>
                  <div className="tlLoc-Overlay">
                    <h2 className="theater-location">{theater.Location}</h2>
                  </div>  
              </div>
          </div>
        ))}
      </div>
      {selectedTheater && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Theater Info"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="tlModalInfo">
            <p> Reel Wheels {selectedTheater.Location}</p>
            <p>{selectedTheater.Address}</p>
            <p>Tel {selectedTheater.phoneNumber}</p>
            <p>{selectedTheater.email}</p>
            <p>12pm - 8pm (SUN TO WED) </p>
            <p>12pm - 1am (THURS TO SAT) </p>
          </div>
          <div className="tlModalImgContainer">
            <img className="tlModalImg" src={selectedTheater.image} alt={selectedTheater.Location} style={{ width: "100%" }} />
          </div>
          <div className="tlModalGeoLoc">
            <p>{selectedTheater.longitude}</p>
            <p>{selectedTheater.latitude}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}