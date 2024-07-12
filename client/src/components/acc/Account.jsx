import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import {
    useGetUserByUsernameQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useGetReservationByUserIdQuery,
} from '../../api/sliceActions';
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const [formData, setFormData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [userId, setUserId] = useState(null);
    const [reservationsLoading, setReservationsLoading] = useState(true);
    const [reservationsData, setReservationsData] = useState(null);
    const [reservationsError, setReservationsError] = useState(null);

    const { data: user, error: userError, isLoading: userLoading } = useGetUserByUsernameQuery(username);
    const { data: userData, error: userIdError, isLoading: userIdLoading } = useGetUserByIdQuery(userId, { skip: !userId });
    const { data: reservations, error: userReservationsError } = useGetReservationByUserIdQuery(userId, { skip: !userId });
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
            setUserId(user.id);
        }
    }, [user]);

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
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = { ...formData, id: userId };
            const data = await updateUser(updatedUserData);
            console.log(data);
            setIsEditMode(false);

            history.go(0); 
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleGoBack = () => {
        setIsEditMode(false);
    };

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
                        <h3><b>Personal Information</b></h3>
                        <hr/>
                        <p className="Username"><b>Username:</b> {user.username}</p>
                        <p className="First"><b>First Name:</b> {user.firstName}</p>
                        <p className="Last"><b>Last Name:</b> {user.lastName}</p>
                        <p className="Address"><b>Address:</b> {user.address}</p>
                        <p className="Email"><b>Email:</b> {user.email}</p>
                        <p className="Birthdate"><b>Birthday:</b> {user.birthdate}</p>
                        <p className="Phone"><b>Phone:</b> {user.phoneNumber}</p>
                        <button onClick={toggleEditMode}>Edit Profile Details</button>
                    </div>
                )}
                {isEditMode && (
                    <form onSubmit={handleFormSubmit}>
                        <div className="edit-details">
                            <div key={user.id}>
                                <ul >
                                    <div className="detail">
                                    <h3><b>Account Details</b></h3>
                                        <p> <b>Username:</b> </p>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        <p className="First"><b>First Name:</b> </p>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        <p className="Last"><b>Last Name:</b></p>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                        <p className="Address"><b>Address:</b></p>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                        <p className="Email"><b>Email:</b></p>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        <p className="Birthdate"><b>Birthday:</b></p>
                                        <input
                                            type="text"
                                            name="birthdate"
                                            value={formData.birthdate}
                                            onChange={handleInputChange}
                                        />
                                        <p className="Phone"><b>Phone Number:</b></p>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                        <br></br>
                                        <button type="button" onClick={handleGoBack}>Go Back</button>
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
                            <h3><b>Reservation History</b></h3>
                            <hr></hr>
                            <ul>
                                {reservationsData.map((reservation) => (
                                    <p key={reservation.id}>
                                        <p>Theater: {reservation.theaterName}</p>
                                        <p>Time: {reservation.time}</p>
                                    </p>
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
}

export default Account;






