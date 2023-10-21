import axios from "axios";
// const token = localStorage.getItem("myData").token;
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default axiosInstance;
