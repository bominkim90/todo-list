import { useState } from "react";
import {postCreateTeam} from '../api/team';


function PopupTeamCreate({setTeamPopup, fetchTeamList}:any) {
  let [teamNameValue, setTeamNameValue] = useState("");

  // 팀 만들기
  async function createTeam() {
    if(teamNameValue.length === 0) {
      return alert("팀 이름으로 빈 값이 들어갈 수 없습니다.");
    }
    const success = await postCreateTeam(teamNameValue);
    console.log("팀 만들기 success : ",success);
    if(success) {
      setTeamPopup(false);
      await fetchTeamList();
    }
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