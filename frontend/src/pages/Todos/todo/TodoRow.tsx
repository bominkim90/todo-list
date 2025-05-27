import { useState } from "react";
import PopDelete from '../../../Popup/PopDelete';
import {putMyTodo, putTeamTodo, deleteMyTodo, deleteTeamTodo, 
  putChangeMyTodoDone, putChangeTeamTodoDone} from '../../../api/todos';
import type {Todo} from '../../../types/todo'; 

type TodoRowProps = {
  currentTeamId: number;
  todoItem: Todo;
  fetchTodoList: () => Promise<void>;
}


function TodoRow(props: TodoRowProps) {
  const {currentTeamId, todoItem, fetchTodoList} = props;

  const [todoContents ,setTodoContents] = useState(todoItem.contents);
  const [onUpdateTodoId, setOnUpdateTodoId] = useState(-1);
  const [showPopDelete, setShowPopDelete] = useState(false);

  // todo 수정
  async function completeUpdate() {
    if(todoItem.contents === todoContents) {
      return alert("수정된 내용이 없습니다.");
    }
    let success = false;
    if(currentTeamId === 0){ // 개인
      success = await putMyTodo(todoItem.id, todoContents);
    }
    else { // 팀
      success = await putTeamTodo(currentTeamId, todoItem.id, todoContents);
    }
    if(success) setOnUpdateTodoId(-1);
  }

  // todo 삭제
  async function deleteTodo() {
    let success = false;
    if(currentTeamId === 0) {
      success = await deleteMyTodo(todoItem.id);
    }
    else {
      success = await deleteTeamTodo(currentTeamId, todoItem.id);
    }
    if(success) await fetchTodoList();
  }

  // done 상태 변경
  async function changeIsDone() {
    let success = false;
    if(currentTeamId === 0) {
      success = await putChangeMyTodoDone(todoItem.id);
    }
    else {
      success = await putChangeTeamTodoDone(currentTeamId, todoItem.id);
    }
    if(success) await fetchTodoList();
  }


  return (
    <div className='input-btn-row'>
      <div className="input-side">
        {
          onUpdateTodoId === todoItem.id 
          ? <input className="input" type="text" value={todoContents} onChange={(e)=>{setTodoContents(e.target.value)}} />
          : <>
              <i className={`checkbox ${todoItem.isDone && "checked"}`} onClick={changeIsDone}></i>
              <div className='input left no-border todo'>{todoContents}</div>
            </>
        }
      </div>
      <div className='btn-side'>
        {
          todoItem.isDone === false
          ? <> 
              {
                onUpdateTodoId === todoItem.id 
                ? <>
                    <button type='button' className='btn short black' onClick={ completeUpdate }>완료</button>
                    <button type='button' className='btn short color-black' 
                    onClick={()=>{setOnUpdateTodoId(-1); setTodoContents(todoItem.contents);}}>취소</button>
                  </>
                : <>
                    <button type='button' className='btn short color-black' onClick={()=>{setOnUpdateTodoId(todoItem.id)}}>수정</button>
                    <button type='button' className='btn short color-red' onClick={()=>{setShowPopDelete(true)}}>삭제</button>
                  </>
              } 
            </>
          : <>
              <button type='button' className='btn short color-red' onClick={()=>{setShowPopDelete(true)}}>삭제</button>
            </>
        }
      </div>
      {showPopDelete && <PopDelete deleteTodo={deleteTodo} setShowPopDelete={setShowPopDelete}/>}
    </div>
  )
}


export default TodoRow;