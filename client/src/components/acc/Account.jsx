import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery } from '../../api/sliceActions'

const Account = () => {
  const { username } = useParams();
  const { data: user, error, isLoading } = useGetUserByUsernameQuery(username); 

  console.log('error:', error);

  return (
    <div className="account">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : user ? (
        <>
          <h1 className="Heading">Welcome {user.firstName}!</h1>
          <div className="Card-Container">
            <div className="Card" key={user.id}>
              <ul className="CardWrapper">
                <div className="Text-Container">
                  <h2>Account Details</h2>
                  <p className="Username">Username: {user.username}</p>
                  <p className="First">First Name: {user.firstName}</p>
                  <p className="Last">Last Name: {user.lastName}</p>
                  <p className="Address">Address: {user.address}</p>
                  <p className="Email">Email: {user.email}</p>
                  <p className="Birthdate">Birthday: {user.birthdate}</p>
                  <p className="Phone">Phone Number: {user.phoneNumber}</p>
                </div>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default Account;


