import axios from "axios"


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true // 쿠키 포함 설정
});

// 응답 인터셉터
instance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    // 401 에러 && 요청 URL이 /login이 아닐 경우만 리다이랙트
    if ( error.response?.status === 401 && !originalRequest.url.include("/login") ) {
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
);


export default instance;