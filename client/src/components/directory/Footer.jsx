import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedIn } from "@fortawesome/free-brands-svg-icons"; 
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// contact us
// about us

//add a link to your linkedin
function Footer(){
    return(
        <footer>
            <h3>Footer</h3>
            <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <FontAwesomeIcon
            icon={faLinkedIn}
            size="3x"
            style={{ color: "#000000" }}
          />
        </a>
            <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <FontAwesomeIcon
            icon={faLinkedIn}
            size="3x"
            style={{ color: "#000000" }}
          />
        </a>
            <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <FontAwesomeIcon
            icon={faLinkedIn}
            size="3x"
            style={{ color: "#000000" }}
          />
        </a>
            <a
          href="https://www.linkedin.com/in/olivia-graham-1b0127190/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <FontAwesomeIcon
            icon={faLinkedIn}
            size="3x"
            style={{ color: "#000000" }}
          />
        </a>
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
        </footer>
    )
}

export default Footer;