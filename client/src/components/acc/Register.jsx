import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/sliceAuth";
import { useState } from "react";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTicket } from '@fortawesome/free-solid-svg-icons'; 

export default function Register() {
  const [addNewUser] = useRegisterMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    birthdate: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const results = await addNewUser(form);
    console.log(results);
    alert("Registration complete! Be sure to log in to access your account!");
    navigate('/login');
  };

  return (
    <div className="rgcontainer">
    <div className="register-page">
      <form onSubmit={onSubmit} className="register-form">
        <div className="left-column">
          <h1 className="register-title">Sign Up</h1>
          <hr></hr>
          <h3>Personal Information</h3>
          <hr></hr>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="First Name..."
              name="firstName"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name..."
              name="lastName"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email..."
              name="email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Address..."
              name="address"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number..."
              name="phoneNumber"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Birthdate..."
              name="birthdate"
              onChange={onChange}
              required
            />
          </div>
          <h3>Account Information</h3>
          <hr></hr>
          <div className="form-group">
            <input
              type="username"
              className="form-control"
              placeholder="Username..."
              name="username"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              name="password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-submission">
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
            <p className="login-link">
              Have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}

