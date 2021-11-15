import { Switch } from "@mui/material";
import React from "react";

const Random = ({ isRandom, handleToggle, onReveal }) => {
  return (
    <>
      <h5>Random Reveal</h5>
      <Switch checked={isRandom} onChange={handleToggle} color="primary" />
    </>
  );
};

export default Random;
