import { Button, FormControlLabel, Switch } from "@mui/material";
import React from "react";

const Random = ({ isRandom, handleToggle, onReveal }) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Switch checked={isRandom} onChange={handleToggle} color="success" />
        }
        label="Random Reveal"
      />

      {/* <Button onClick={onReveal} variant="contained">
        Reveal
      </Button> */}
    </div>
  );
};

export default Random;
