import axios from "axios";

const ax = axios.create({
  withCredentials: true,
});

ax.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default ax;
