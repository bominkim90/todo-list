import axios from "axios";
import { useState, useEffect } from "react";
import PopupTeamCreate from "../../Popup/PopTeamCreate";
import TeamDetail from '../../components/TeamDetail';


// '할일 목록 버튼's / 팀만들기 버튼
function TodosTeamList({fetchTodoList, currentTeamId ,setCurrentTeamId}:any){
  let [teamBtns, setTeamBtns] = useState<any[]>([]);
  let [showTeamDetail, setShowTeamDetail] = useState(false);

  // 더미 데이터 (팀 리스트)
  let teamArr = [ 
    {teamId : 1, teamName : "A"},
    {teamId : 2, teamName : "B"},
    {teamId : 3, teamName : "C"}
  ]

  // 팀 리스트 정보 갱신
  function fetchTeamList() {
    // 백엔드 API 연동 시
    // axios.get('/team')
    // .then( res => {
    //   console.log("팀 리스트 정보 갱신 성공 ", res);
    //   setTeamBtns(res.data);
    // })
    // .catch(err => {
    //   console.error("팀 리스트 정보 갱신 실패 ", err);
    // });
    setTeamBtns(teamArr); // 더미 데이터
  }
  
  // '팀 목록' 조회 후 -> teamBtns(배열)에 넣기
  useEffect( () => {
    fetchTeamList();
  }, []);

  // '할일 목록 버튼' 클릭 ( /todos/:teamId GET 요청 )
  async function getTeamTodos(teamId:any = '') {
    console.log("teamId : ", teamId);
    setCurrentTeamId(teamId || 0); // 현재 팀id 상태값
    fetchTodoList();
  }

  // '팀 만들기' 버튼 클릭 => 팝업 노출
  let [teamPopup, setTeamPopup] = useState(false);
  
  // 팀 상세 창 active state
  let [activeTeamDetailPop, setActiveTeamDetailPop] = useState(0);

  // 팀 상세창 pop 오픈
  function openTeamDetailPop(teamId:any = ''){
    setActiveTeamDetailPop(teamId);
    setCurrentTeamId(teamId || 0); // 현재 팀id 상태값
  }


  return (
    <div className="todo-teamList">
      {/* '나' 할일 목록 버튼 */}
      <div className={`btn left blue ${(currentTeamId === 0 ? "active" : "")}`} onClick={ () => {getTeamTodos()} }>개인 할 일 목록</div>
      
      {/* '팀' 할일 목록 버튼 */}
      {teamBtns.map( value => {
        return <div className={`btn left blue ${(currentTeamId === value.teamId ? "active" : "")}`} key={value.teamId} 
        onClick={ (e) => { getTeamTodos(value.teamId); e.stopPropagation() } }>
          팀 {value.teamName}의 할 일 목록

          {/* 팀원 초대하기 / 팀 삭제하기 버튼 */}
          <div className="ellipsis" onClick={(e)=>{ openTeamDetailPop(value.teamId); e.stopPropagation(); }}>
            { 
              (activeTeamDetailPop === value.teamId) 
              && <TeamDetail teamName={value.teamName} setActiveTeamDetailPop={setActiveTeamDetailPop} currentTeamId={currentTeamId} setCurrentTeamId={setCurrentTeamId} fetchTeamList={fetchTeamList} fetchTodoList={fetchTodoList} /> 
            }
          </div>

        </div>
      }) }
      
      {/* 팀 만들기 버튼 */}
      <div className="btn center" onClick={ ()=>{setTeamPopup(true);} }>팀 만들기</div>
      
      {teamPopup && <PopupTeamCreate setTeamPopup={setTeamPopup}/>}
    </div>
  )
}


export default TodosTeamList;