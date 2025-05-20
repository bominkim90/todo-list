

function PopupTeamCreate({setTeamPopup}:any) {
  return (
    <div className="popup small">
      <div className="popup-inner">
        <strong className="popup-head">
          팀 만들기
        </strong>
        <div className="popup-body">
          <input className="input" type="text" placeholder="팀 이름을 입력해주세요." />
        </div>
        <div className="popup-button">
          <button type="button" className="btn short black">팀 만들기</button>
          <button type="button" className="btn short color-black" onClick={() => {setTeamPopup(false)} }>취소</button>
        </div>
      </div>
    </div>
  )
}


export default PopupTeamCreate;