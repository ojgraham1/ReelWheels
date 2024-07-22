import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

// team members with their details
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
    image: "https://media.licdn.com/dms/image/D4D03AQHAfxLZWzm8hQ/profile-displayphoto-shrink_800_800/0/1721518143296?e=1726704000&v=beta&t=c-WSVcM_Rh0juTtk9jBsdt6Qg2-U7CBRjMhKeGqxgCQ", 
    linkedin: "https://www.linkedin.com/in/maya-obeidat-0064b4316/"
  },
  {
    id: 3,
    name: "Daniel Patterson",
    location: "Atlanta, Georgia",
    image: "https://media.licdn.com/dms/image/D4E03AQHxJDNfAE5rsw/profile-displayphoto-shrink_800_800/0/1719191974397?e=1726704000&v=beta&t=1kVfqMFTeH_0rvBgzxm1ElM4kZl1ajIdJQ64pKLJvIc", 
    linkedin: "https://www.linkedin.com/in/daniel-patterson-29a075314/"
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
  const [selectedMember, setSelectedMember] = useState(null);  // State to track selected team member
  const [animateTitle, setAnimateTitle] = useState(false); // State for animating the title

  useEffect(() => {
    setAnimateTitle(true); // Trigger animation when component mounts
    return () => {
      setAnimateTitle(false);
    };
  }, []);

   // Function to handle click on a team member card
  const handleClick = (member) => {
    setSelectedMember(member); // Set the selected member when clicked
  };

  // Function to close the popup
  const handleClose = () => {
    setSelectedMember(null); // Reset selected member to close the popup
  };

  
  return (
    <div className="about-us">
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <h3 className="about-subtitle">
          We are a team of four students who share a passion for coding. After three months of learning through FullStack academy, we are able to bring our ideas to life.
        </h3>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Our Story</h2>
        <p className="about-section-content">
          Our mission is simple: to learn, create, and inspire through code. Throughout our learning journey, we encountered challenges that pushed our boundaries and sparked our creativity. From mastering the basics of variables and functions to building complex interactive elements, each milestone brought us closer to our goal of becoming proficient web developers.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">The Capstone Project</h2>
        <p className="about-section-content">
          Inspired by a movie API, Reel Wheels came to life. A website that showcases not only our technical skills but also our creative vision. From responsive designs that adapt seamlessly across devices to interactive features that engage visitors, every detail was meticulously crafted to demonstrate our capabilities as web developers.
        </p>
      </div>

      <div className={`about-title ${animateTitle ? "slide-in" : ""}`}>
        Fullstack Academy's Finest
      </div>

      <div className="team-scroll-container">
        <div className="team-container">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-member"
              onClick={() => handleClick(member)}
            >
              <div className="member-info">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
                <h3 className="member-name">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedMember && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClose}>&times;</span>
              <h2 className="popup-name">{selectedMember.name}</h2>
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="popup-image"
              />
              <p className="popup-location">Located in {selectedMember.location}</p>
              <p className="popup-learn-more">
                Learn more about {selectedMember.name}
              </p>
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
    </div>
    </div>
  );
}

export default AboutUs;
