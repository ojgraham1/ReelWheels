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
    birthMonth: "",
    birthDay: "",
    birthYear: "",
  });

    // Function to handle input change in the form fields
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

// Constructing a formatted date string based on form inputs (assuming form is an object containing birthYear, birthMonth, and birthDay)
    const birthdateString = `${form.birthYear}-${String(Number(form.birthMonth)).padStart(2, '0')}-${String(Number(form.birthDay) + 1).padStart(2, '0')}`;
    // Creating a Date object from the formatted date string
    const birthdate = new Date(`${birthdateString}T00:00:00Z`);
// Creating a new object formData by spreading properties from the original form and adding birthdate as a Date object
    const formData = { ...form, birthdate };

    try {
      // Attempting to add a new user with formData
      const results = await addNewUser(formData); 
      console.log(results); // Logging the registration results 
      alert("Registration complete! Be sure to log in to access your account!");
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="rgcontainer">
      <div className="register-page">
        <form onSubmit={onSubmit} className="register-form">
          <div className="left-column">
            <h1 className="register-title">Sign Up</h1>
            <h3>Personal Information</h3>
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
            <div className="bdform-group">
              <input
                type="number"
                className="form-control"
                placeholder="MM"
                name="birthMonth"
                value={form.birthMonth}
                onChange={onChange}
                min="1"
                max="12"
                required
              />
              <input
                type="number"
                className="form-control"
                placeholder="DD"
                name="birthDay"
                value={form.birthDay}
                onChange={onChange}
                min="1"
                max="31"
                required
              />
              <input
                type="number"
                className="form-control"
                placeholder="YYYY"
                name="birthYear"
                value={form.birthYear}
                onChange={onChange}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
            <h3>Account Information</h3>
            <div className="form-group">
              <input
                type="text"
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
