import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { NavLink} from "react-router-dom";

// Footer with link to Github and About Us page
function Footer(){
    return(
        <footer>
            <a
          href="https://github.com/ojgraham1/ReelWheels"
          target="_blank"
          rel="noopener noreferrer"
          className="git"
        >
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            style={{ color: "#ffff" }}
          />
        </a>
        <NavLink
            to="/aboutus"
            className="aboutus"
        >
            About Us
        </NavLink>
        </footer>
    )
}

export default Footer;