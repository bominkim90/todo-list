import axios from '../lib/axios'


// 로그인 요청
export async function postLogin(userId: any, userPw: any){
  try {
    const res = await axios.post('/auth/login', {
      id : userId,
      password : userPw
    });
    return (res.status === 200); // 로그인 성공 여부
  }
  catch (err){
    return false;
  }
}


export async function postSignup(userId: string, userPw: string){
  try {
    const res = await axios.post('/auth/signup', {
      id : userId,
      password : userPw
    });
    return (res.status === 201);
  }
  catch(err) {
    console.error("회원가입 실패 ", err);
    return false;
  }
}