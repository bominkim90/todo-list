import axios from "axios";
import { useState } from "react";


// 투두리스트 등록하기
function RegistTodo({fetchTodoList, currentTeamId}:any){
  let [todoContents, setTodoContents] = useState("");

  // Todo 등록 -> POST /todos
  function createTodo() {
    console.log("currentTeamId : ",currentTeamId);
    axios.post(`/todos/${currentTeamId || ""}`, {contents: todoContents})
    .then(res => {
      console.log("등록 완료 ",res);
      fetchTodoList();
    })
    .catch(err => {
      console.error("등록 실패 ",err);
    });
  }


  return (
    <div className='todo-row'>
      <input className="input" type="text" placeholder="투두리스트 등록하기" 
      onChange={(e)=>{setTodoContents(e.target.value)}} />
      <div className='btn-side'>
        <button type='button' className='btn short black'
        onClick={createTodo}>등록하기</button>
      </div>
    </div>
  )
}


export default RegistTodo;