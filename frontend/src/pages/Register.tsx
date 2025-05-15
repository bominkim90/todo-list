import Input from '../components/InputText'

function Register() {
 
  let isIdPwWrong = false
 
  return (
    <div className="home-login-join">
      <div className="input-wrap">
        <h1 className="text-align-center">회원가입</h1>
        <Input placeholder="아이디를 입력해주세요."/>
        <Input placeholder="비밀번호를 입력해주세요."/>
        <Input placeholder="비밀번호를 다시시 입력해주세요."/>
        {isIdPwWrong && <p style={{'color':'#EF4444', 'fontSize':'14px','fontWeight':'500','lineHeight':'1.5'}}>비밀번호가 일치하지 않습니다.</p>}
        <button className="btn black" type="button">회원가입</button>
      </div>
    </div>
  )
}

export default Register