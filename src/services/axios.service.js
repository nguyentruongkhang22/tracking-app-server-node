import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

ax.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default ax;
