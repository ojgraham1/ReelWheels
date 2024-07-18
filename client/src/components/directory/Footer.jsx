import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


function Footer(){
    return(
        <footer>
            <h3>Footer</h3>
            <a
          href="https://github.com/ojgraham1/ReelWheels"
          target="_blank"
          rel="noopener noreferrer"
          className="git"
        >
          <FontAwesomeIcon
            icon={faGithub}
            size="3x"
            style={{ color: "#000000" }}
          />
        </a>
        <a
            href="/aboutus"
            className="aboutus"
        >
            About Us
        </a>
        </footer>
    )
}

export default Footer;