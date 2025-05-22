import {useState} from 'react'
import axios from 'axios'


function SignUp() {
  const [validationFail, setvalidationFail] = useState(false)
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userPw_re, setUserPw_re] = useState('')

  async function postSignUp(){
    console.log("userId : ", userId);
    console.log("userPw : ", userPw);
    console.log("userPw_re : ", userPw_re);
    if(userPw !== userPw_re) {
      return setvalidationFail(true);
    }
    const res = await axios.post('/login', {
      id : userId,
      password : userPw
    });
    if(res.status === 200) { // 회원가입 성공
      window.location.href = '/login'
    }
    else { // 회원가입 실패
      setvalidationFail(true)
    }
  }

  return (
    <div className="home-login-join">
      <div className={`input-wrap ${validationFail && "validation"}`}>
        <h1 className="text-align-center">회원가입</h1>
        <input className="input" type="text" placeholder="아이디를 입력해주세요."
          value={userId} onChange={ (event) => {setUserId(event.target.value);} } />

        <input className="input validation" type="password" placeholder="비밀번호를 입력해주세요."
          value={userPw} onChange={ (event) => {setUserPw(event.target.value); setvalidationFail(false); } } />

        <input className="input validation" type="password" placeholder="비밀번호를 다시 입력해주세요."
          value={userPw_re} onChange={ (event) => {setUserPw_re (event.target.value); setvalidationFail(false); } } />

        {validationFail && <p style={{'color':'#EF4444', 'fontSize':'14px','fontWeight':'500','lineHeight':'1.5'}}>비밀번호가 일치하지 않습니다.</p>}
        
        {/* 회원가입 버튼 누르면 => /signUp POST 요청청 */}
        <button className="btn black" type="button" onClick={postSignUp}>회원가입</button>
      </div>
    </div>
  )
}

export default SignUp
