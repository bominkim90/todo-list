import axios from "../lib/axios";
import { useState } from "react";


// 팀 => 초대하기 / 삭제하기
function PopTeamInvite({setShowPopTeamInvite}:any) {
  let [teamNameValue, setTeamNameValue] = useState("");
  let [crewId, setCrewId] = useState("");

  function inviteTeam() {
    axios.put('/team', {
      inviteId : crewId
    })
    .then(res => {
      console.log("초대 성공 ", res);
    })
    .catch(err => {
      console.log("에러 : ", err)
    });
  }

  return (
    <div className="popup small">

      <div className="popup-inner">
        <strong className="popup-head">팀원 초대하기</strong>

        <div className="popup-body">

          <div className='input-btn-row'>
            <input className="input" type="text" placeholder="초대할 팀원의 아이디를 입력해주세요." onChange={(e)=>{setCrewId(e.target.value)}} />
            <div className='btn-side'>
                <button type='button' className='btn short black'>완료</button>
            </div>
          </div>
          
          <ul>
            <li>person01 (휴지통 버튼)</li>
            <li>person02 (휴지통 버튼)</li>
          </ul>

        </div>

        <div className="popup-button">
          <button type="button" className="btn short color-black" onClick={() => {setShowPopTeamInvite(false)} }>닫기</button>
        </div>

      </div>

    </div>
  )
}


export default PopTeamInvite;