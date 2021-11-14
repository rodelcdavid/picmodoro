import { GlobalStyles } from "@mui/material";

const globalStyles = (
  <GlobalStyles
    styles={{
      "*, *::before, *::after": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        fontFamily: "'Montserrat', sans-serif",
        minHeight: "100vh",
        overflowY: "scroll",
      },
    }}
  />
);

export default globalStyles;
