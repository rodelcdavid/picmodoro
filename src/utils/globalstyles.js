import { GlobalStyles } from "@mui/material";
import { Box } from "@mui/system";

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
        backgroundImage:
          "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
      },
    }}
  />
);

export const Wrapper = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </Box>
  );
};

export default globalStyles;
