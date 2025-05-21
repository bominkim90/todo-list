import axios from "axios";
import { useState } from "react";

function PopupTeamCreate({setTeamPopup}:any) {
  let [teamNameValue, setTeamNameValue] = useState("");

  // 팀 만들기 -> POST '/team'
  function createTeam() {
    if(teamNameValue.length === 0) {
      return alert("팀 이름으로 빈 값이 들어갈 수 없습니다.");
    }
    axios.post('/team', 
      {
        teamName: teamNameValue
      }
    );
  }

  return (
    <div className="popup small">
      <div className="popup-inner">
        <strong className="popup-head">팀 만들기</strong>
        <div className="popup-body">
          <input className="input" type="text" placeholder="팀 이름을 입력해주세요."
          onChange={(e)=>{setTeamNameValue(e.target.value)}} />
        </div>
        <div className="popup-button">
          <button type="button" className="btn short black" onClick={createTeam}>팀 만들기</button>
          <button type="button" className="btn short color-black" onClick={() => {setTeamPopup(false)} }>취소</button>
        </div>
      </div>
    </div>
  )
}


export default PopupTeamCreate;