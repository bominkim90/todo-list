import { useEffect, useState } from "react";
import {getCrewList, putCrew, deleteCrew} from '../api/team';
import type {TeamCrew} from '../types/teamCrew';
import type {Team} from '../types/team';

type PopTeamInviteProps = {
  teamValue: Team;
  setShowPopTeamInvite: (value: boolean) => void;
  currentTeamId: number;
}


// 팀원 => 초대하기 / 삭제하기
function PopTeamInvite(props: PopTeamInviteProps) {
  const {teamValue, setShowPopTeamInvite, currentTeamId} = props;
  let [userId, setUserId] = useState("");
  let [teamCrewArr, setTeamCrewArr] = useState<TeamCrew[]>([]);

  // 팀원 조회
  async function fetchTeamCrew() {
    const result = await getCrewList(currentTeamId);
    if(result) setTeamCrewArr(result.members);
  }
  
  // 팀원 초대
  async function inviteCrew() {
    if(userId.length === 0) {
      return alert("초대할 아이디를 입력해주세요.");
    }
    const result = await putCrew(currentTeamId ,userId);
    if(result) await fetchTeamCrew();
    else alert("존재하지 않는 id 이거나, 이미 팀원에 존재하는 id입니다.");
  }

  // 팀원 추방
  async function kickCrew(userId: string){
    const success = await deleteCrew(currentTeamId, userId);
    if(success) await fetchTeamCrew();
  }

  useEffect( ()=>{
    fetchTeamCrew();
  }, []);


  return (
    <div className="popup">

      <div className="popup-inner">
        <strong className="popup-head">{teamValue.name}팀 - 팀원 초대하기</strong>

        <div className="popup-body">

          <div className='input-btn-row'>
            <input className="input" type="text" placeholder="초대할 팀원의 아이디를 입력해주세요." 
            onChange={(e)=>{setUserId(e.target.value); e.stopPropagation(); }} />
            <div className='btn-side'>
                <button type='button' className='btn short black' onClick={ inviteCrew }>초대</button>
            </div>
          </div>
          
          <ul className="list-text">
            {teamCrewArr.map( (teamCrewValue:TeamCrew) => 
              {
                return <li key={teamCrewValue.userId}>
                        <span>{teamCrewValue.userId} {teamValue.adminId === teamCrewValue.userId && "(관리자)"}</span>
                        { 
                          teamValue.adminId === teamCrewValue.userId
                          || <i className="btn delete" onClick={()=>{kickCrew(teamCrewValue.userId)}}></i> 
                        }
                      </li>
              }
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