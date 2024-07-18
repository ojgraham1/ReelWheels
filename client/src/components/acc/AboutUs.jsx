import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function AboutUs() {
  return (
    <div>
      <a
        href="https://www.linkedin.com/in/thomas-graham-097b272b6/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin"
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          size="3x"
          style={{ color: "#000000" }}
        />
      </a>

      <a
        href="https://www.linkedin.com/in/maya-o-0064b4316/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin"
      >
        <FontAwesomeIcon
          icon={faLinkedin}
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
          icon={faLinkedin}
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
          icon={faLinkedin}
          size="3x"
          style={{ color: "#000000" }}
        />
      </a>
    </div>
  );
}

export default AboutUs;
