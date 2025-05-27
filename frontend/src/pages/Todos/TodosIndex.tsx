import TodosList from './todo/TodosList';
import TodosTeamList from './team/TodosTeamList';
import { useEffect, useState } from 'react';
import {getMyTodo, getTeamTodo} from '../../api/todos';
import type {Todo} from '../../types/todo';


function Todos() {
  const localStorage_currentTeamId = Number(localStorage.getItem("localStorage_currentTeamId")) || 0;
  const [currentTeamId, setCurrentTeamId] = useState(Number(localStorage_currentTeamId) || 0);
  const [arr_todoList, setArr_todoList] = useState<Todo[]>([]);

  // todo 리스트 정보 갱신
  async function fetchTodoList() {
    let result = [];
    if(currentTeamId === 0) { // 개인
      result = await getMyTodo();
    }
    else { // 팀
      result = await getTeamTodo(currentTeamId);
    }
    if(result) setArr_todoList(result);
  }

  useEffect( ()=>{
    // 처음 => '개인' 할일 목록 불러오기 '/todos'
    fetchTodoList();
  }, [])

  return (
    <div className="todo-home">
      {/* 팀 목록 */}
      <TodosTeamList currentTeamId={currentTeamId} setCurrentTeamId={setCurrentTeamId} fetchTodoList={fetchTodoList} />

      {/* TODO / DONE 리스트 */}
      <TodosList arr_todoList={arr_todoList} currentTeamId={currentTeamId} fetchTodoList={fetchTodoList} />
    </div>
  )
}


export default Todos;