// src/lib/axios.ts

import axios from "axios"


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true // 쿠키 포함 설정
});

// 응답 인터셉터
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default instance