import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../api/sliceAuth";
import { useNavigate, NavLink } from "react-router-dom";
import { setToken, setUsername, setUserId } from "../../api/sliceAuth";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form).unwrap();
      console.log("Login Result:", result);
      if (result.token && result.userId) {
        dispatch(setToken(result.token));
        console.log("Dispatched setToken:", result.token);
        dispatch(setUsername(form.username));
        dispatch(setUserId(result.userId));
        console.log("Dispatched setUserId:", result.userId);

        console.log(
          "Local Storage Token after login:",
          localStorage.getItem("token")
        );
        console.log(
          "Local Storage UserId after login:",
          localStorage.getItem("userId")
        );
      } else {
        console.error("Login failed: missing token or userId");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
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
