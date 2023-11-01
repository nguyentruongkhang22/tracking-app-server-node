import axios from "axios";

// const baseURL = "http://127.0.0.1:3003";

const ax = axios.create({
  withCredentials: true,
});

ax.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default ax;
