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
        // backgroundImage:
        //   "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
        // backgroundImage: "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
        //  oundImage: "linear-gradient( #007adf 0%, #00ecbc 100%)", backgr
        // backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        // backgroundImage: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
        // backgroundImage:
        //   "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
      },
    }}
  />
);

export default globalStyles;
