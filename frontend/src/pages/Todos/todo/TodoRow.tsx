import { useState } from "react";
import PopDelete from '../../../popup/PopDelete';
import {putMyTodo, putTeamTodo, deleteMyTodo, deleteTeamTodo, 
  putChangeMyTodoDone, putChangeTeamTodoDone} from '../../../api/todos';


function TodoRow({currentTeamId, value, fetchTodoList}: any) {
  let [todoContents ,setTodoContents] = useState(value.contents);
  let [onUpdateTodoId, setOnUpdateTodoId] = useState(-1);
  let [showPopDelete, setShowPopDelete] = useState(false);

  // todo 수정
  async function completeUpdate() {
    let success = false;
    if(currentTeamId === 0){ // 개인
      success = await putMyTodo(value.todoId, todoContents);
    }
    else { // 팀
      success = await putTeamTodo(currentTeamId, value.todoId, todoContents);
    }
    if(success) setOnUpdateTodoId(-1);
  }

  // todo 삭제
  async function deleteTodo() {
    let success = false;
    if(currentTeamId === 0) {
      success = await deleteMyTodo(value.todoId);
    }
    else {
      success = await deleteTeamTodo(currentTeamId, value.todoId);
    }
    if(success) await fetchTodoList();
  }

  // done 상태변경
  async function changeIsDone() {
    let success = false;
    if(currentTeamId === 0) {
      success = await putChangeMyTodoDone(value.todoId);
    }
    else {
      success = await putChangeTeamTodoDone(currentTeamId, value.todoId);
    }
    if(success) await fetchTodoList();
  }

  return (
    <div className='input-btn-row'>
      <div className="input-side">
        {
          onUpdateTodoId === value.todoId 
          ? <input className="input" type="text" value={todoContents} onChange={(e)=>{setTodoContents(e.target.value)}} />
          : <>
            <i className={`checkbox ${value.isDone && "checked"}`} onClick={changeIsDone}></i>
            <div className='input left no-border todo'>{todoContents}</div>
            </>
        }
      </div>
      <div className='btn-side'>
        {
          value.isDone === false
          ? 
          <> {
              onUpdateTodoId === value.todoId 
              ? 
              <>
              <button type='button' className='btn short black' onClick={ completeUpdate }>완료</button>
              <button type='button' className='btn short color-black' 
              onClick={()=>{setOnUpdateTodoId(-1); setTodoContents(value.contents);}}>취소</button>
              </>
              : 
              <>
              <button type='button' className='btn short color-black' onClick={()=>{setOnUpdateTodoId(value.todoId)}}>수정</button>
              <button type='button' className='btn short color-red' onClick={()=>{setShowPopDelete(true)}}>삭제</button>
              </>
          } </>
          :
          <>
            <button type='button' className='btn short color-red' onClick={()=>{setShowPopDelete(true)}}>삭제</button>
          </>
        }
      </div>
      {showPopDelete && <PopDelete deleteTodo={deleteTodo} setShowPopDelete={setShowPopDelete} todoId={value.todoId} fetchTodoList={fetchTodoList}/>}
    </div>
  )
}


export default TodoRow