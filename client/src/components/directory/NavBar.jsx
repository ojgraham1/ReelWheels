import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../api/sliceAuth";
import DateTime from "./DateTime";
import "../../styles/directory/nav.scss";

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
      <div className="nbDateTime">
        <DateTime />
      </div>
      <ul className="navBarL">
        <li>
          <NavLink className="nL" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/theaters">
            Theaters
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/concessions">
            Wine & Dine
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/browse">
            Browse Movies
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/movies">
            Now Playing
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/watchlist">
            Watch List
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/cart">
            Cart
          </NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink className="nL" to={`/users/${username}`}>
                Account
              </NavLink>
            </li>
            <li>
              <button className="nL-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink className="nL" to="/login">
                Log In
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
