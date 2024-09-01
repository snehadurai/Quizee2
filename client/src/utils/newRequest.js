
// newRequest.js
import axios from "axios";

const newRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://quizee2.vercel.app",
  withCredentials: true,
});

export default newRequest; // Ensure default export is present
