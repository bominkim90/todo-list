import { useState } from "react";
import {postMyTodo, postTeamTodo} from '../../../api/todos';


// todo 등록
function RegistTodo({fetchTodoList, currentTeamId}:any){
  let [todoContents, setTodoContents] = useState("");

  // 개인 Todo 등록
  async function createTodo() {
    if(todoContents.length === 0) return alert("공백은 입력할 수 없습니다.");
    if(currentTeamId === 0) { // 개인 todo
      await postMyTodo(todoContents);
    }
    else { // 팀 todo
      await postTeamTodo(todoContents, currentTeamId);
    }
    await fetchTodoList();
    setTodoContents("");
  }

  return (
    <div className='input-btn-row'>
      <input className="input" type="text" placeholder="투두리스트 등록하기" value={todoContents}
      onChange={(e)=>{setTodoContents(e.target.value)}} />
      <div className='btn-side'>
        <button type='button' className='btn short black' onClick={createTodo}>등록하기</button>
      </div>
    </div>
  )
}


export default RegistTodo;