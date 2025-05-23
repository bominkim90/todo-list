import { useEffect, useRef, useState } from "react";
import PopTeamInvite from '../../../Popup/PopTeamInvite';
import {deleteTeam} from '../../../api/team';


// 팀 상세창 (팀 삭제 / 팀원 초대하기 팝업)
function TeamDetail({teamValue ,currentTeamId, setCurrentTeamId, setActiveTeamDetailPop, fetchTeamList, fetchTodoList}:any) {
  let [showPopTeamInvite, setShowPopTeamInvite] = useState(false); // 팀원 초대하기 pop 보이기
 
  // 팀 '삭제'
  async function tryDeleteTeam() {
    const result = await deleteTeam(currentTeamId);
    if(result) {
      setCurrentTeamId(0)// activeClass -> '내 할일 목록' 으로 변경
      await fetchTodoList();// 위에서 teamId 변경 -> '내 할일 목록' 으로 변경
      await fetchTeamList(); // 팀 목록 갱신
    }
  }

  // 팀 상세창 영역 외 click => 닫힘
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActiveTeamDetailPop(0)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => { // cleanup 함수: 컴포넌트가 언마운트될 때 이벤트 제거
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);


  return (
    <div className="pop-ellipsis" ref={ref}>
      <div onClick={()=>{setShowPopTeamInvite(true); setActiveTeamDetailPop(0);}}>초대하기</div>
      <div onClick={tryDeleteTeam}>삭제하기</div>

      {showPopTeamInvite && <PopTeamInvite teamValue={teamValue} setShowPopTeamInvite={setShowPopTeamInvite} currentTeamId={currentTeamId} />}
    </div>
  )
}


export default TeamDetail;