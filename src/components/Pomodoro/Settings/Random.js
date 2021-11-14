import { Switch } from "@mui/material";
import React from "react";

const Random = ({ isRandom, handleToggle, onReveal }) => {
  return (
    <div>
      <h5>Random Reveal</h5>
      <Switch checked={isRandom} onChange={handleToggle} color="primary" />

      {/* <Button onClick={onReveal} variant="contained">
        Reveal
      </Button> */}
    </div>
  );
};

export default Random;
