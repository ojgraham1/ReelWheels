import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetUserByUsernameQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetReservationByUserIdQuery,
} from "../../api/sliceActions";
import { useDispatch } from "react-redux";

const Account = () => {
  const dispatch = useDispatch(); // Accessing Redux dispatch function
  const { username } = useParams(); // Extracting username parameter from URL
  const [formData, setFormData] = useState({}); // State for form data
  const [isEditMode, setIsEditMode] = useState(false); // State for edit mode toggle
  const [userId, setUserId] = useState(null); // State to store user ID
  const [reservationsLoading, setReservationsLoading] = useState(true); // State for reservations loading status
  const [reservationsData, setReservationsData] = useState(null); // State for reservations data
  const [reservationsError, setReservationsError] = useState(null); // State for reservations error

  // Query to fetch user data by username
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useGetUserByUsernameQuery(username);

  // Query to fetch user data by user ID
  const {
    data: userData,
    error: userIdError,
    isLoading: userIdLoading,
  } = useGetUserByIdQuery(userId, { skip: !userId });

  // Query to fetch reservations data by user ID
  const { data: reservations, error: userReservationsError } =
    useGetReservationByUserIdQuery(userId, { skip: !userId });

    // Mutation hook for updating user data
  const [updateUser] = useUpdateUserMutation();

  // Effect to initialize form data and user ID when `user` data changes
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
      setUserId(user.id);
    }
  }, [user]);

   // Effect to fetch reservations data when `userData`, `reservations`, or `userReservationsError` changes
  useEffect(() => {
    if (userData) {
      setFormData(userData);
      const fetchReservationsByUserId = async () => {
        if (reservations) {
          setReservationsData(reservations);
        }
        if (userReservationsError) {
          setReservationsError(userReservationsError);
        }
        setReservationsLoading(false);
      };
      fetchReservationsByUserId();
    }
  }, [userData, reservations, userReservationsError]);

  // Function to handle input change in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   // Function to handle form submission (updating user details)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = { ...formData, id: userId };
      const data = await updateUser(updatedUserData);
      console.log(data); // Logging updated user data 
      setIsEditMode(false); // Exit edit mode
      history.go(0); // Refresh the page
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

   // Function to handle going back from edit mode
  const handleGoBack = () => {
    setIsEditMode(false);
  };

   // Conditional rendering based on loading, error, and data states
  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError.message}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="account">
      <h1>Account Profile</h1>
      <hr></hr>
      <>
        {!isEditMode && (
          <div className="account-details">
            <h3>
              <b>Personal Information</b>
            </h3>
            <hr />
            <p className="Username">
              <b>Username:</b> {user.username}
            </p>
            <p className="First">
              <b>First Name:</b> {user.firstName}
            </p>
            <p className="Last">
              <b>Last Name:</b> {user.lastName}
            </p>
            <p className="Address">
              <b>Address:</b> {user.address}
            </p>
            <p className="Email">
              <b>Email:</b> {user.email}
            </p>
            <p className="Birthdate">
              <b>Birthday:</b> {user.birthdate}
            </p>
            <p className="Phone">
              <b>Phone:</b> {user.phoneNumber}
            </p>
            <button onClick={toggleEditMode}>Edit Profile Details</button>
          </div>
        )}
        {isEditMode && (
          <form onSubmit={handleFormSubmit}>
            <div className="edit-details">
              <div key={user.id}>
                <ul>
                  <div className="detail">
                    <h3>
                      <b>Account Details</b>
                    </h3>
                    <p>
                      <b>Username:</b>
                    </p>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <p className="First">
                      <b>First Name:</b>
                    </p>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <p className="Last">
                      <b>Last Name:</b>
                    </p>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <p className="Address">
                      <b>Address:</b>
                    </p>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <p className="Email">
                      <b>Email:</b>
                    </p>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <p className="Birthdate">
                      <b>Birthday:</b>
                    </p>
                    <input
                      type="text"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                    />
                    <p className="Phone">
                      <b>Phone Number:</b>
                    </p>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    <br></br>
                    <button type="button" onClick={handleGoBack}>
                      Go Back
                    </button>
                    <button type="submit">Update Details</button>
                  </div>
                </ul>
              </div>
            </div>
          </form>
        )}

        {!isEditMode && (
          <div className="reservation-history">
            {reservationsLoading ? (
              <div>Loading reservations...</div>
            ) : reservationsError ? (
              <div>Error: {reservationsError.message}</div>
            ) : reservationsData ? (
              <div>
                <h3>
                  <b>Reservation History</b>
                </h3>
                <hr></hr>
                <ul>
                  {reservationsData.map((reservation) => (
                    <li key={reservation.id}>
                      <p>Theater Location: {reservation.theaterLocation}</p>
                      <p>Movie: {reservation.movieName}</p>
                      <p>Time: {new Date(reservation.time).toLocaleString()}</p>
                      <p>
                        Purchase Time:{" "}
                        {new Date(reservation.purchaseTime).toLocaleString()}
                      </p>
                      <p>Ticket Type: {reservation.ticketType}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>No Reservations Found</div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Account;
