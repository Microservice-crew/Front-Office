import axios from "axios";
// const token = localStorage.getItem("myData").token;
const axiosInstance = axios.create({
  baseURL: process.env.SPRING_APP_API_URL1 || "http://localhost:8082/api/staff",
  headers: {
    "Content-Type": "application/json",
  },
});
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default axiosInstance;
