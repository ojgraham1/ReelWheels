import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const userId = 119; 
        const token = localStorage.getItem("token"); 

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setUser(response.data);

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching User:", error);
        setLoading(false); 
      }
    };

    fetchUserById();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="account">
      <h1 className="Heading">Welcome {user.firstName}!</h1>
      <div className="Card-Container">
        <div className="Card" key={user.id}>
          <ul className="CardWrapper">
            <div className="Text-Container">
                <h2>Account Details</h2>
            <p className="Username">Username: {user.username}</p>
            <p className="First">First Name: {user.firstName}</p>
              <p className="Last">Last Name: {user.lastName}</p>
              <p className="Adress">Address: {user.address}</p>
              <p className="Email">Email: {user.email}</p>
              <p className="Birthdate">Birthday: {user.birthdate}</p>
              <p className="Phone">Phone Number: {user.phoneNumber}</p>
              
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
