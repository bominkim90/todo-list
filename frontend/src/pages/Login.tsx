import {Link} from 'react-router-dom';
import {useState} from 'react';
import {postLogin} from '../api/auth';


function Login() {
  const [validationFail, setValidationFail] = useState(false)
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')

  async function tryLogin(){
    const success = await postLogin(userId, userPw);
    if(!success) setValidationFail(true)
  }

  return (
    <div className="home-login-join">
      <div className={`input-wrap ${validationFail && "validation"}`}>
        <h1 className="text-align-center">로그인</h1>
        
        <input id="user_id" className="input" type="text" placeholder="아이디를 입력해주세요."
          value={userId} onChange={ (event) => {setUserId(event.target.value); setValidationFail(false);} } />
        
        <input id="user_pw" className="input" type="password" placeholder="비밀번호를 입력해주세요."
          value={userPw} onChange={ (event) => {setUserPw(event.target.value); setValidationFail(false); } } />
        
        {validationFail && <p style={{'color':'#EF4444', 'fontSize':'14px','fontWeight':'500','lineHeight':'1.5'}}>아이디와 비밀번호를 확인해주세요.</p>}
        
        <button className="btn black center" type="button" onClick={tryLogin}>로그인</button>
        
        <Link to='/signup' className='btn white center'>회원가입</Link>
      </div>
    </div>
  )
}

export default Login