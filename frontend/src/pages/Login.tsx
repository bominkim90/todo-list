import {Link} from 'react-router-dom'
import Input from '../components/InputText'

function Login() {
  // 로그인용 access_token을 가지고있다? (서버가 확인해서 로그인플래그값 'Y' or 'N' 전달해준다)
  // loginFlag값에 따라 => 로그인 페이지이냐, 할 일 목록 페이지 이냐

  let isIdPwWrong = false

  // 회원가입 버튼 누르면 => 회원가입 페이지로 이동
  return (
    <div className="home-login-join">
      <div className="input-wrap">
        <h1 className="text-align-center">로그인</h1>
        <Input placeholder="아이디를 입력해주세요."/>
        <Input placeholder="비밀번호를 입력해주세요."/>
        {isIdPwWrong && <p style={{'color':'#EF4444', 'fontSize':'14px','fontWeight':'500','lineHeight':'1.5'}}>아이디와 비밀번호를 확인해주세요.</p>}
        <button className="btn black" type="button">로그인</button>
        <Link to='/register' className='btn white'>회원가입</Link>
      </div>
    </div>
  )
}

export default Login