import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 1 minute timeout
  retries: 3, // retry 3 times if request times out
  retryDelay: 1000,
  // timeout:5000
});
