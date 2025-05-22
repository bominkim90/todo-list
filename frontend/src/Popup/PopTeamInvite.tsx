import axios from "../lib/axios";
import { useState } from "react";


// 팀원 => 초대하기 / 삭제하기
function PopTeamInvite({teamName, setShowPopTeamInvite, currentTeamId, teamCrewArr ,fetchTeamCrew}:any) {
  let [crewName, setCrewName] = useState("");

  // 팀원 초대
  function inviteCrew() {
    if(crewName.length === 0) {
      return alert("초대할 아이디를 입력해주세요.");
    }
    console.log("팀원 초대 "+crewName);
    axios.put('/team', {
      inviteId : crewName
    })
    .then(res => {
      console.log("초대 성공 ", res);
      fetchTeamCrew(); // 팀원 목록 갱신 axios (state갱신->리랜더링)
    })
    .catch(err => {
      console.log("에러 : ", err)
    });
  }

  // 팀원 추방
  function kickCrew(crewId:any){
    axios.delete(`/팀원삭제API/${crewId}`)
    .then(res => {
      console.log("팀원 추방 성공" , res);
      fetchTeamCrew(); // 팀원 목록 갱신
    })
    .catch(err => {
      console.error("팀원 추방 실패 ",err);
    })
  }


  return (
    <div className="popup">

      <div className="popup-inner">
        <strong className="popup-head">{teamName}팀 - 팀원 초대하기</strong>

        <div className="popup-body">

          <div className='input-btn-row'>
            <input className="input" type="text" placeholder="초대할 팀원의 아이디를 입력해주세요." onChange={(e)=>{setCrewName(e.target.value); e.stopPropagation(); }} />
            <div className='btn-side'>
                <button type='button' className='btn short black' onClick={ inviteCrew }>초대</button>
            </div>
          </div>
          
          <ul className="list-text">
            {teamCrewArr.map( (value:any, index:any) => 
              {return <li key={index /*value.teamCrewId*/}>
                <span>{value.name}</span>
                <i className="btn delete" onClick={()=>{kickCrew(value.crewId)}}></i>
              </li>}
            )}
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