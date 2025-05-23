import TodosList from './todo/TodosList';
import TodosTeamList from './team/TodosTeamList';
import { useEffect, useState } from 'react';
import {getTodo} from '../../api/todos';


function Todos() {
  const localStorage_currentTeamId = Number(localStorage.getItem("localStorage_currentTeamId")) || 0;
  let [currentTeamId, setCurrentTeamId] = useState(localStorage_currentTeamId || 0);
  let [arr_todoList, setArr_todoList] = useState<any[]>([]);

  // todo 리스트 정보 갱신
  async function fetchTodoList() {
    const result = await getTodo(currentTeamId);
    console.log("todo 리스트 GET 정보 : ", result);
    if(result) setArr_todoList(result);
  }

  useEffect( ()=>{
    // 처음에는 '나'의 할일 목록 불러오기 '/todos'
    fetchTodoList()
  }, [])
  

  return (
    <div className="todo-home">
      {/* 팀 목록 */}
      <TodosTeamList setArr_todoList={setArr_todoList} currentTeamId={currentTeamId} setCurrentTeamId={setCurrentTeamId} fetchTodoList={fetchTodoList} />

      {/* TODO / DONE 리스트 */}
      <TodosList arr_todoList={arr_todoList} currentTeamId={currentTeamId} fetchTodoList={fetchTodoList} />
    </div>
  )
}


export default Todos