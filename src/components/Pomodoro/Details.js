import React from "react";

const Details = ({ goalName, computeReveal, numPomodoro }) => {
  return (
    <div>
      <h2>{goalName}</h2>

      {/* should grab totalReveal instead of calling computereveal */}
      <p>
        Progress: {computeReveal()}/{numPomodoro}
      </p>
    </div>
  );
};

export default Details;
