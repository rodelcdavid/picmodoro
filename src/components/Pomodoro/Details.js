import React from "react";

const Details = ({ goalName, computeReveal, numPomodoro }) => {
  return (
    <div>
      <h1>{goalName}</h1>

      {/* should grab totalReveal instead of calling computereveal */}
      <h2>
        Progress: {computeReveal()}/{numPomodoro}
      </h2>
    </div>
  );
};

export default Details;
