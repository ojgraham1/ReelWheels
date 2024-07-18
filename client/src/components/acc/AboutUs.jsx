import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const teamMembers = [
  {
    id: 1,
    name: "Thomas Graham",
    location: "Atlanta, Georgia",
    image: "https://media.licdn.com/dms/image/D5603AQFyq4Pokp-egQ/profile-displayphoto-shrink_800_800/0/1721318928449?e=1726704000&v=beta&t=EC51BT-Ab0yh200mnbrNQlBJ0lHVbpM-Dbg9PwRx5eI",
    linkedin: "https://www.linkedin.com/in/thomas-graham-097b272b6/"
  },
  {
    id: 2,
    name: "Maya Obeidat",
    location: "Atlanta, Georgia",
    image: "https://via.placeholder.com/150", 
    linkedin: "https://www.linkedin.com/in/maya-o-0064b4316/"
  },
  {
    id: 3,
    name: "Daniel Patterson",
    location: "Atlanta, Georgia",
    image: "https://via.placeholder.com/150", 
    linkedin: "https://www.linkedin.com/"
  },
  {
    id: 4,
    name: "Olivia Graham",
    location: "Detroit, Michigan",
    image: "https://media.licdn.com/dms/image/C4E03AQG5W6SuHTbEmw/profile-displayphoto-shrink_800_800/0/1589649352413?e=1726704000&v=beta&t=T4mfEQc3uG13iM5Rvy4e0_2TY-9J9p7apq0vgGjpJQ8",
    linkedin: "https://www.linkedin.com/in/olivia-graham-1b0127190/"
  },
];

function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    setAnimateTitle(true);
    return () => {
      setAnimateTitle(false);
    };
  }, []);

  const handleClick = (member) => {
    setSelectedMember(member);
  };

  const handleClose = () => {
    setSelectedMember(null);
  };

  return (
    <div className="about">
      <h1 className={animateTitle ? "slide-in" : ""}>
        Fullstack Academy's Finest
      </h1>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="team-member"
            onClick={() => handleClick(member)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="bw-image"
            />
            <h3>{member.name}</h3>
          </div>
        ))}
      </div>
      {selectedMember && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>{selectedMember.name}</h2>
            <img src={selectedMember.image} alt={selectedMember.name} className="color-image" />
            <p>Located in {selectedMember.location}</p>
            <p>Learn more about {selectedMember.name}</p>
            <a
              href={selectedMember.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: "#0077B5" }} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
