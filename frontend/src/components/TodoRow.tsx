import axios from "axios";
import { useState } from "react";
import PopDelete from '../Popup/PopDelete';


function TodoRow({value, fetchTodoList}: any) {
  let [todoContents ,setTodoContents] = useState(value.contents);
  let [rowUpdateState, setRowUpdateState] = useState(-1);
  let [showPopDelete, setShowPopDelete] = useState(false);

  // 수정 => PUT /todos {todoId: todo아이디, contents: 내용}
  function completeUpdate() {
    console.log("todo 수정 버튼 클릭 시 => todoId : ", value.todoId);
    setRowUpdateState(-1);
    // 백엔드 API 연동 했을 시
    // axios.put('/todos', {
    //   todoId: value.todoId,
    //   contents: todoContents
    // })
    // .then(res => {
    //   console.log("수정 완료", res.data);
    //   fetchTodoList();
    //   setRowUpdateState(-1);
    // })
    // .catch(err => {
    //   console.error("수정 실패", err);
    // });
  }

  // 삭제 => DELETE /todos/{todoId}
  function deleteTodo() {
    console.log("todo 삭제 버튼 클릭 시 => todoId : ", value.todoId);
    // 백엔드 API 연동 했을 시
    // axios.delete(`/todos/${value.todoId}`)
    // .then(res => {
    //   console.log("삭제 완료", res.data);
    //   fetchTodoList();
    // })
    // .catch(err => {
    //   console.error("삭제 실패", err);
    // });
  }

  return (
    <div className='input-btn-row'>
      {
        rowUpdateState === value.todoId 
        ? <input className="input" type="text" value={todoContents} onChange={(e)=>{setTodoContents(e.target.value)}} />
        : <div className='input left no-border todo'>{todoContents}</div>
      }
      <div className='btn-side'>
        {
          rowUpdateState === value.todoId 
          ? 
          <>
          <button type='button' className='btn short black' onClick={completeUpdate}>완료</button>
          <button type='button' className='btn short color-black' 
          onClick={()=>{setRowUpdateState(-1); setTodoContents(value.contents);}}>취소</button>
          </>
          : 
          <>
          <button type='button' className='btn short color-black' onClick={()=>{setRowUpdateState(value.todoId)}}>수정</button>
          <button type='button' className='btn short color-red' onClick={()=>{setShowPopDelete(true)}}>삭제</button>
          </>
        }
      </div>
      {showPopDelete && <PopDelete setShowPopDelete={setShowPopDelete} todoId={value.todoId} fetchTodoList={fetchTodoList}/>}
    </div>
  )
}


export default TodoRow