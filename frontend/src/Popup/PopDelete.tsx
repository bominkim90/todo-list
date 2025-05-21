import axios from "axios";


function PopupTeamCreate({setShowPopDelete, todoId, fetchTodoList}:any) {

  // 투두리스트 삭제 -> DELETE '/todos/{todoId}'
  function deleteTodo() {
    console.log("todoId : ", todoId);
    axios.delete(`/todos/${todoId}`)
    .then(res => {
      console.log("투두리스트 삭제 성공 ", res);
      fetchTodoList();
    })
    .catch(err => {console.log("에러 : ", err)});
  }


  return (
    <div className="popup small">
      <div className="popup-inner">
        <strong className="popup-head">정말 삭제하시겠습니까?</strong>
        <div className="popup-body">

        </div>
        <div className="popup-button">
          <button type="button" className="btn short black" onClick={deleteTodo}>확인</button>
          <button type="button" className="btn short color-black" onClick={() => {setShowPopDelete(false)} }>취소</button>
        </div>
      </div>
    </div>
  )
}


export default PopupTeamCreate;