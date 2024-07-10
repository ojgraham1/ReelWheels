import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    useGetUserByUsernameQuery,
    useUpdateUserMutation,
    useGetReservationByUserIdQuery,
} from '../../api/sliceActions';
import { useDispatch } from 'react-redux';

const Account = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const { data: user, error, isLoading } = useGetUserByUsernameQuery(username);
    const [formData, setFormData] = useState({ ...user });
    const [isEditMode, setIsEditMode] = useState(false); 
    const [userId, setUserId] = useState(null);

    const fetchUserId = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            });
            const data = await response.json();
            setUserId(data.userId);
        } catch (error) {
            console.error('Error fetching userId:', error);
        }
    };

    useEffect(() => {
        fetchUserId(); 
    }, [user]);

    const { data: reservationsData, error: reservationsError, isLoading: reservationsLoading } = useGetReservationByUserIdQuery(userId || '');

    const { mutate: updateUser, isLoading: isUpdating } = useUpdateUserMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(formData)); 
        setIsEditMode(false);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode); 
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>No user data available</div>;

    return (
        <div className="account">
            <>
                <h1 className="Heading">Welcome {user.firstName}!</h1>
                <p className="Username"><b>Username:</b> {user.username}</p>
                <p className="First"><b>First Name:</b> {user.firstName}</p>
                <p className="Last"><b>Last Name:</b> {user.lastName}</p>
                <p className="Address"><b>Address:</b> {user.address}</p>
                <p className="Email"><b>Email:</b> {user.email}</p>
                <p className="Birthdate"><b>Birthday:</b> {user.birthdate}</p>
                <p className="Phone"><b>Phone:</b> {user.phoneNumber}</p>
               
                {isEditMode ? (
                    <form onSubmit={handleFormSubmit}>
                        <div className="Card-Container">
                            <div className="Card" key={user.id}>
                                <ul className="CardWrapper">
                                    <div className="Text-Container">
                                        <h2>Account Details</h2>
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
                                        <button type="submit">Update Details</button>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </form>
                ) : (
                    <button onClick={toggleEditMode}>Edit Profile Details</button>
                )}

                <div>
                    {reservationsLoading ? (
                        <div>Loading reservations...</div>
                    ) : reservationsError ? (
                        <div>Error: {reservationsError.message}</div>
                    ) : reservationsData ? (
                        <div>
                            <h2>Reservation History</h2>
                            <ul>
                                {reservationsData.map((reservation) => (
                                    <li key={reservation.id}>
                                        <p>Theater: {reservation.theaterName}</p>
                                        <p>Time: {reservation.time}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>No reservations found</div>
                    )}
                </div>

            </>
        </div>
    );
};

export default Account;




