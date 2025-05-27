import axios from "axios";
import { useState, useEffect } from "react";
import PopupTeamCreate from "../../../Popup/PopTeamCreate";
import TeamDetail from './TeamDetail';
import {getTeamList} from '../../../api/team';
import type {Team} from '../../../types/team';

type TodoTeamListProps = {
  fetchTodoList: () => Promise<void>;
  currentTeamId: number;
  setCurrentTeamId: (id: number) => void;
}


// '할일 목록 버튼's / 팀만들기 버튼
function TodosTeamList(props: TodoTeamListProps){
  const {fetchTodoList, currentTeamId ,setCurrentTeamId} = props;

  const [teamBtns, setTeamBtns] = useState<Team[]>([]);

  // 팀 리스트 정보 갱신
  async function fetchTeamList() {
    let result = await getTeamList();
    if(result) {
      setTeamBtns(result);
    }
  }

  // '할일 목록 버튼' 클릭 ( /todos/:teamId GET 요청 )
  async function getTeamTodos(teamId:number = 0) {
    localStorage.setItem("localStorage_currentTeamId", teamId.toString());
    setCurrentTeamId(teamId);
  }

  // '팀 만들기' 버튼 클릭 => 팝업 노출
  const [teamPopup, setTeamPopup] = useState(false);
  
  // 팀 상세 창 active state
  const [activeTeamDetailPop, setActiveTeamDetailPop] = useState(0);

  // 팀 상세창 pop 오픈
  function openTeamDetailPop(teamId:number = 0){
    setActiveTeamDetailPop(teamId);
    setCurrentTeamId(teamId);
  }

  // 로그아웃
  async function logout() {
    // 1. 쿠키 삭제
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    /* 브라우저에서는 JavaScript로 직접 HttpOnly 쿠키는 삭제할 수 없습니다.
      token이 백엔드에서 HttpOnly로 설정된 쿠키라면, 프론트에서 JS로는 접근할 수도, 삭제할 수도 없습니다. 
      해결 방법 → 서버에 token 쿠키 제거 처리 요청
    */
    // await axios.post('/auth/logout');
    // 2. localStorage_currentTeamId 삭제
    localStorage.removeItem('localStorage_currentTeamId');
    // 3. 로그인페이지로 이동
    window.location.href = '/login'; // 기존 상태(state), 캐시 등 초기화
    // const navigate = useNavigate(); // 컴포넌트 상태(state), context, 메모리 유지됨 => 요건 컴포넌트 코드 최상단에 선언해야함
    // navigate('/login');
  }
  
  useEffect(()=>{
    fetchTodoList();
    localStorage.setItem("localStorage_currentTeamId", currentTeamId.toString());
  }, [currentTeamId]);

  useEffect( () => {
    fetchTeamList();
  }, []);


  return (
    <div className="todo-teamList">
      {/* '나' 할일 목록 버튼 */}
      <div className={`btn left blue ${(currentTeamId === 0 ? "active" : "")}`} onClick={ () => {getTeamTodos()} }>개인 할 일 목록</div>
      
      {/* '팀' 할일 목록 버튼 */}
      {teamBtns.map( value => {
        return <div className={`btn left blue ${(currentTeamId === value.id ? "active" : "")}`} key={value.id} 
        onClick={ (e) => { getTeamTodos(value.id); e.stopPropagation(); } }>
          팀 {value.name}의 할 일 목록

          {/* 팀 상세창 => 팀원 초대하기 / 팀 삭제하기 버튼 */}
          <div className="ellipsis" onClick={(e)=>{ openTeamDetailPop(value.id); e.stopPropagation(); }}>
            { 
              (activeTeamDetailPop === value.id) 
              && <TeamDetail teamValue={value} setActiveTeamDetailPop={setActiveTeamDetailPop} currentTeamId={currentTeamId} setCurrentTeamId={setCurrentTeamId} fetchTeamList={fetchTeamList} fetchTodoList={fetchTodoList} /> 
            }
          </div>

        </div>
      }) }
      
      {/* 팀 만들기 버튼 */}
      <div className="btn center" onClick={ ()=>{setTeamPopup(true);} }>팀 만들기</div>
      <br />
      <br />
      <br />
      {/* 로그아웃 */}
      <div className="btn center color-red" onClick={ logout }>로그아웃</div>
      
      {teamPopup && <PopupTeamCreate setTeamPopup={setTeamPopup} fetchTeamList={fetchTeamList} />}
    </div>
  )
}


export default TodosTeamList;