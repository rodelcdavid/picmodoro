const dev = process.env.NODE_ENV === "development";
const api = dev ? "http://localhost:7000" : process.env.REACT_APP_SERVER_URL;

export default api;
