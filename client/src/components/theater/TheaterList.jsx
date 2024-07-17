import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import DateTime from "../directory/DateTime";

Modal.setAppElement("#root");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function TheaterList() {
  const [theaters, setTheaters] = useState([]);
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
      {/* <div className="tlDateTime">
        <DateTime />
      </div> */}
      <div className="theater-cards-wrapper">
        {theaters.map((theater) => (
          <div className="theater-card" key={theater.id} onClick={() => openModal(theater)}>
            <div className="tlbgImg" style={{ backgroundImage: `url(${theater.image})` }}>
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
          className="tlModal"
          overlayClassName="tlOverlay"
        >
          <div className="tlModalInfo">
            <h2>Reel Wheels {selectedTheater.Location}</h2>
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
            <MapContainer
              center={[selectedTheater.latitude, selectedTheater.longitude]}
              zoom={15}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[selectedTheater.latitude, selectedTheater.longitude]}>
                <Popup>
                  {selectedTheater.Location}<br />{selectedTheater.Address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </Modal>
      )}
    </div>
  );
}