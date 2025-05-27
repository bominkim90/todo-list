
type PopupTeamCreateProps = {
  deleteTodo: () => void;
  setShowPopDelete: (showState: boolean) => void;
}


function PopupTeamCreate(props: PopupTeamCreateProps) {
  const {deleteTodo ,setShowPopDelete} = props;

  return (
    <div className="popup small">
      <div className="popup-inner">
        <strong className="popup-head">정말 삭제하시겠습니까?</strong>

        <div className="popup-body"></div>

        <div className="popup-button">
          <button type="button" className="btn short black" onClick={deleteTodo}>확인</button>
          <button type="button" className="btn short color-black" onClick={() => {setShowPopDelete(false)} }>취소</button>
        </div>
      </div>
    </div>
  )
}


export default PopupTeamCreate;