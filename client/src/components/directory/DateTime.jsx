import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <span>{date.toLocaleTimeString()}</span>
      <span>{date.toLocaleDateString()}</span>
    </div>
  );
};

export default DateTime;
