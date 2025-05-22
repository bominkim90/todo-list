import { useEffect, useRef, useState } from "react";
import PopTeamInvite from '../Popup/PopTeamInvite';
import axios from "axios";


// 팀 상세창 (초대하기/삭제하기)
function TeamDetail({teamName ,currentTeamId, setCurrentTeamId, setActiveTeamDetailPop, fetchTeamList, fetchTodoList}:any) {
  let [showPopTeamInvite, setShowPopTeamInvite] = useState(false); // 팀원 초대하기 pop 보이기
  let [teamCrewArr, setTeamCrewArr] = useState<any[]>([]); // 팀원 목록 state

  // 팀원 목록 조회 + state 업데이트
  function fetchTeamCrew() {
    setTeamCrewArr([
      {
        name : "팀원 1",
        crewId : 1
      },
      {
        name : "팀원 2",
        crewId : 2
      }
    ]); // 더미 데이터
    // axios.get('/팀원목록조회API')
    // .then(res =>{
    //   console.log("팀원목록조회 성공 ", res);
    //   setTeamCrewArr(res.data);
    // })
    // .catch(err => {
    //   console.error("팀원목록조회 실패 ", err);
    // });
  }

  // 팀 '삭제'
  function deleteTeam() {
    axios.delete(`/team/${currentTeamId}`)
    .then(res => {
      console.log(currentTeamId ,"팀 삭제 성공", res);
      setCurrentTeamId(0)// activeClass -> '내 할일 목록' 으로 변경
      fetchTodoList();// 위에서 teamId 변경 -> '내 할일 목록' 으로 변경
      fetchTeamList(); // 팀 목록 갱신
    })
    .catch(err => {
      console.error("팀 삭제 실패 ",err);
    })
  }

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 팀원 초대/삭제 팝업 오픈시 => 팀원 목록 불러오기기
    fetchTeamCrew();

    // 팀 상세창 영역 외 click => 닫힘
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
      <div onClick={deleteTeam}>삭제하기</div>

      {showPopTeamInvite && <PopTeamInvite teamName={teamName} setShowPopTeamInvite={setShowPopTeamInvite} currentTeamId={currentTeamId} teamCrewArr={teamCrewArr} fetchTeamCrew={fetchTeamCrew} />}
    </div>
  )
}


export default TeamDetail;