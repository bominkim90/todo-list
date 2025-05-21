import { useEffect, useRef, useState } from "react";
import PopTeamInvite from '../Popup/PopTeamInvite';


function TeamDetail({currentTeamId, setActiveTeamDetailPop}:any) {
  let [showPopTeamInvite, setShowPopTeamInvite] = useState(false);

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActiveTeamDetailPop(0)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="pop-ellipsis" ref={ref}>
      <div onClick={()=>{setShowPopTeamInvite(true); setActiveTeamDetailPop(0);}}>초대하기</div>
      <div>삭제하기</div>

      {showPopTeamInvite && <PopTeamInvite setShowPopTeamInvite={setShowPopTeamInvite}/>}
    </div>
  )
}


export default TeamDetail;