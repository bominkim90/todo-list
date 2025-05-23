import { useEffect} from 'react'
import axios from 'axios'


// 1) 로그인 O => jwt 쿠키를 가지고 있다 가정하고
// 그렇다면 서버는 그걸 확인해서 모든 API의 응답에 res.user에 정보를 담아 줄 것이다

// 2) 로그인 X => jwt 쿠키 안가지고 있을 것
// 그렇다면 res.user는 undefined가 될 것이다.
function checkAuth() {
  useEffect(()=>{
    axios.get('/')
      .then( res => {
        console.log("응답 데이터 : ", res.data)
        // 로그인 인증 실패 => 로그인 화면으로 리다이랙트
        if(!res.data.user) {
          window.location.href = '/login'
        }
      })
      .catch(error => {
        console.error("에러 발생 : ", error)
      })
  }, [])
}

export default checkAuth;