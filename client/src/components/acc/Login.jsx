import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../api/sliceAuth";
import { useNavigate, NavLink } from "react-router-dom";
import { setToken, setUsername, setUserId } from "../../api/sliceAuth";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const token = useSelector((state) => state.auth.token); // Selecting token 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [login] = useLoginMutation(); // Using login mutation hook from Redux slice
  const [form, setForm] = useState({ username: "", password: "" }); // State for login form fields


  // Function to handle input change in the form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form).unwrap(); // Calling login mutation

      if (result.token && result.userId) {
        // If login is successful and token and userId are received
        dispatch(setToken(result.token)); // Dispatching action to set token
        dispatch(setUsername(form.username)); // Dispatching action to set username
        dispatch(setUserId(result.userId)); // Dispatching action to set userId
      } else {
        console.error("Login failed: missing token or userId");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  // Effect to redirect to home page if token exists (user is logged in)
  useEffect(() => {
    if (token) {
      navigate("/");  // Redirect to home page
    }
  }, [token, navigate]);

  return (
    <div className="lgcontainer">
      <div className="signin-container">
        <div className="signin-header">
          <h1>Log In</h1>
        </div>
        {!token && (
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <input
                className="logInput"
                type="text"
                placeholder="Username..."
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="logInput"
                type="password"
                placeholder="Password..."
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>
        )}
        <div className="signin-footer">
          <p>
            Don't have an account? <NavLink to="/register">Sign up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
