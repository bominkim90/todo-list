import { useState, useEffect } from "react";
import PopupTeamCreate from "../../../Popup/PopTeamCreate";
import TeamDetail from './TeamDetail';
import {getTeamList} from '../../../api/team';


// '할일 목록 버튼's / 팀만들기 버튼
function TodosTeamList({fetchTodoList, currentTeamId ,setCurrentTeamId}:any){
  let [teamBtns, setTeamBtns] = useState<any[]>([]);

  // 팀 리스트 정보 갱신
  async function fetchTeamList() {
    let result = await getTeamList();
    if(result) {
      setTeamBtns(result);
    }
  }
  
  useEffect( () => {
    fetchTeamList().then();
  }, []);

  // '할일 목록 버튼' 클릭 ( /todos/:teamId GET 요청 )
  async function getTeamTodos(teamId:any = '') {
    localStorage.setItem("localStorage_currentTeamId", teamId); // localStorage_currentTeamId 저장
    const result = await setCurrentTeamId(teamId || 0);
    if(result === false) { // 혹시 없는 팀 정보를 조회할 경우
      setCurrentTeamId(0);
    }
  }
  useEffect(()=>{
    fetchTodoList();
  }, [currentTeamId])

  // '팀 만들기' 버튼 클릭 => 팝업 노출
  let [teamPopup, setTeamPopup] = useState(false);
  
  // 팀 상세 창 active state
  let [activeTeamDetailPop, setActiveTeamDetailPop] = useState(0);

  // 팀 상세창 pop 오픈
  function openTeamDetailPop(teamId:any = ''){
    setActiveTeamDetailPop(teamId);
    setCurrentTeamId(teamId || 0); // 현재 팀id 상태값
  }
  
  useEffect(()=>{
    localStorage.setItem("localStorage_currentTeamId", currentTeamId);
  }, [currentTeamId]);

  return (
    <div className="todo-teamList">
      {/* '나' 할일 목록 버튼 */}
      <div className={`btn left blue ${(currentTeamId === 0 ? "active" : "")}`} onClick={ () => {getTeamTodos()} }>개인 할 일 목록</div>
      
      {/* '팀' 할일 목록 버튼 */}
      {teamBtns.map( value => {
        return <div className={`btn left blue ${(currentTeamId === value.id ? "active" : "")}`} key={value.id} 
        onClick={ (e) => { getTeamTodos(value.id); e.stopPropagation() } }>
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
      
      {teamPopup && <PopupTeamCreate setTeamPopup={setTeamPopup} fetchTeamList={fetchTeamList} />}
    </div>
  )
}


export default TodosTeamList;