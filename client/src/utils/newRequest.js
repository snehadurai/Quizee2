// import axios from "axios";

// export const newRequest = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
//   withCredentials: true,
// });

import axios from "axios";

const newRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://quizee2.vercel.app',
  withCredentials: true,
});

export default newRequest;
