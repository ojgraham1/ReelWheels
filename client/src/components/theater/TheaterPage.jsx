import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function TheaterPage() {
  const [theater, setTheater] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleTheater = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/theater/${id}`);
        setTheater(response.data);
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    };

    fetchSingleTheater();
  });

  return (
    <div>
      <h1>{theater.Location}</h1>
      <ul>
        {theater.map((theater) => (
          <li key={theater.id}>
            <Link to={`/theater/${theater.id}`}>{theater.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
