import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/sliceAuth";
import { useState } from "react";

export default function Register() {
  const [addNewUser] = useRegisterMutation(); // Using register mutation hook from Redux slice
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

    // Function to handle input change in the form fields
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const results = await addNewUser(form); // Calling register mutation with form data
    console.log(results); // Logging the registration results 
    alert("Registration complete! Be sure to log in to access your account!");
    navigate('/login'); // Redirect to login page
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

