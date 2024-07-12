import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../api/sliceAuth";

export default function NavBar() {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };
  return (
    <nav className="navBar">
      <ul className="navBarL">
        <ul>
          <NavLink className="nL" to="/">
            Home
          </NavLink>
        </ul>
        <ul>
          <NavLink className="nL" to="/theaters">
            Theaters
          </NavLink>
        </ul>
        <ul>
          <NavLink className="nL" to="/concessions">
            Wine & Dine
          </NavLink>
        </ul>
        <ul>
          <NavLink className="nL" to="/browse">
            Browse Movies
          </NavLink>
        </ul>
        <ul>
          <NavLink className="nL" to="/movies">
            Now Playing
          </NavLink>
        </ul>
        <ul>
          <NavLink to="/watchlist">Watch List</NavLink>
        </ul>
        <ul className="nL">
          <NavLink to="/cart" className="cart-link">
            Cart
          </NavLink>
        </ul>
        {token ? (
          <>
            <ul className="nL">
              <NavLink to={`/users/${username}`} className="account-link">
                Account
              </NavLink>
            </ul>
            <ul>
              <button className="nL-logout" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <NavLink className="nL" to="/login">
                Log In
              </NavLink>
            </ul>
          </>
        )}
      </ul>
    </nav>
  );
}

