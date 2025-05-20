import axios from "axios";
import { useState } from "react";
import PopupTeamCreate from "../../components/Popup/PopupTeamCreate";

function TodoList(){

  // 팀 목록 조회
  let teamArr: any[] = []
  async function getTeams(){
    const res = await axios.get('/team');
    // res.data가 배열로 온다는 가정하에
    teamArr = res.data;
  }
  // getTeams()

  // (mock데이터) 팀 리스트
  teamArr = [
    {
      teamId : 1,
      teamName : "팀 A"
    },
    {
      teamId : 2,
      teamName : "우린 두번째!"
    },
    {
      teamId : 3,
      teamName : "우린 에이스 팀이다다"
    }
  ]
  let [teamList, setTeamList] = useState(teamArr)

  // 팀 만들기
  let [teamPopup, setTeamPopup] = useState(false)
  function createTeam() {
    console.log("팀 만들기 클릭")
    setTeamPopup(true);
    // axios.post('/team', {
    //   teamName : "팀"
    // }) 
  }

  return (
    <div className="todo-team">
      <button type="button" className="btn left blue">할 일 목록</button>
      {teamList.map( value => <div className="btn left blue other" key={value.teamId}>팀 {value.teamName}의 할 일 목록</div>) }
      <button type="button" className="btn center" onClick={createTeam}>팀 만들기</button>
      {teamPopup && <PopupTeamCreate setTeamPopup={setTeamPopup}/>}
    </div>
  )
}

export default TodoList;