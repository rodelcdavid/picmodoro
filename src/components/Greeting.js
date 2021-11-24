import React from "react";

const Greeting = ({ name }) => {
  return (
    <div>
      <h3 style={{ color: "#fff" }}>Good day, {name}!</h3>
    </div>
  );
};

export default Greeting;
