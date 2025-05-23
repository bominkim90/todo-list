import TodosList from './todo/TodosList';
import TodosTeamList from './team/TodosTeamList';
import { useEffect, useState } from 'react';
// import {getTodo} from '../../api/todos';


function Todos() {
  const localStorage_currentTeamId = Number(localStorage.getItem("localStorage_currentTeamId")) || 0;
  let [currentTeamId, setCurrentTeamId] = useState(localStorage_currentTeamId || 0);
  let [arr_todoList, setArr_todoList] = useState<any[]>([]);

  // 더미 데이터
  let myTodos: any = [ 
    {
      todoId: 1,
      contents: "나의 할일 1",
      isDone: false
    },
    {
      todoId: 2,
      contents: "나의 할일 2",
      isDone: false
    },
    {
      todoId: 3,
      contents: "나의 할일 3",
      isDone: true
    },
  ]

  // todo 리스트 정보 갱신
  async function fetchTodoList() {
    // const result = await getTodo(currentTeamId);
    // if(result) setArr_todoList(result.data);
    setArr_todoList(myTodos); // 더미 데이터 (나중에 삭제)
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