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
    <div className="register-page">
      <form onSubmit={onSubmit} className="register-form">
        <div className="left-column">
          <h1 className="register-title">Sign Up</h1>
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
        <div className="right-column">
          <div className="info-box">
            <h2>Why register for an account?</h2>
            <hr></hr>
            <ul>
            <p><b>Save tickets & orders:</b> <br></br>
              Tickets and snacks are stored in your account, accessible at the push of a button.</p>
              <p><b>Save payment methods:</b> 
              <br></br>Checkout is a breeze by saving your credit card to your account.</p>
              <p><b>Earn and redeem rewards:</b> 
              <br></br>Redeem your points for exclusive rewards and experiences.</p>
              <p><b>Suggestions based on you:</b>
              <br></br>Based on past orders, we can recommend movies you and your preferences.</p>
              <p><b>Manage your account:</b>
              <br></br>Update your account information, change your password, and more.</p>
              <hr></hr>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

