import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../api/sliceAuth";
import DateTime from "./DateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
    setHamburgerOpen(false);
  };

  const closeMenu = () => {
    setHamburgerOpen(false);
  };

  return (
    <nav className="navBar">
      <div className="nbDateTime">
        <DateTime />
      </div>
      <div
        className={`hamburger ${hamburgerOpen ? "open" : ""}`}
        onClick={toggleHamburger}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <ul className={`navBarL ${hamburgerOpen ? "open" : ""}`}>
        <div className="vLogoContent">
          <video
            className="vLogo"
            src="/../../vLogo.mp4"
            autoPlay
            loop
            playsInline
          />
        </div>
        <li>
          <NavLink className="nL" to="/" onClick={closeMenu}>
            Now Playing
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/theaters" onClick={closeMenu}>
            Theaters
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/concessions" onClick={closeMenu}>
            Wine & Dine
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/browse" onClick={closeMenu}>
            Archives
          </NavLink>
        </li>
        <li>
          <NavLink className="nL" to="/watchlist" onClick={closeMenu}>
            Watch List
          </NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink className="nL" to={`/users/${username}`} onClick={closeMenu}>
                Account
              </NavLink>
            </li>
            <li>
              <button className="nL-logout-icon" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink className="nLin" to="/login" onClick={closeMenu}>
              Log In
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
