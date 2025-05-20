import axios from "axios";


function DoneRow({value, fetchTodoList}:any) {
  // TO DO 삭제 => DELETE /todos {todoId : todo아이디}
  function deleteTodo() {
    console.log("todo 삭제 버튼 클릭 시 => todoId : ",value.todoId);
    // 백엔드 API 연동 시
    // axios.delete(`/todos/${value.todoId}`)
    // .then(res => {
    //   console.log("투두 삭제 성공 ", res);
    //   fetchTodoList();
    // })
    // .catch(err => {
    //   console.error("투두 삭제 실패 ", err);
    // });
  }

  return (
    <div className='todo-row'>
      <div className='input left no-border done'>{value.contents}</div>
      <div className='btn-side'>
        <button type='button' className='btn short color-red' onClick={deleteTodo}>삭제</button>
      </div>
    </div>
  )
}

export default DoneRow