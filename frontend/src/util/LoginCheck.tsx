import axios from "../lib/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {ReactNode} from 'react'


type Props = {
  children: ReactNode
}


function LoginCheck({children}: Props) {
  const navigate = useNavigate();

  useEffect( ()=> {
    axios.get('/auth', { withCredentials: true }) // 쿠키 자동 포함
    .then(res => {
      if(!res.data.user) {
        console.error("로그인 인증 실패");
        navigate("/login");
      }
      if (location.pathname === "/") { // '/' 경로에만
        navigate("/todos");
      }
      console.log("로그인 인증 성공 : ", res);
    })
    .catch(err => {
      console.error("로그인 인증 에러 : ", err);
      navigate("/login");
    });
  }, []);

  return <>{children}</>
}


export default LoginCheck;