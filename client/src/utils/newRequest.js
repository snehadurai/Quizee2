
// newRequest.js
import axios from "axios";

const newRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

export default newRequest; // Ensure default export is present
