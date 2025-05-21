import TodosRegist from "./TodosRegist";
import TodoRow from "../../components/TodoRow";
import DoneRow from "../../components/DoneRow";


// 투두리스트 등록하기 / TO DO 목록 / DONE 목록
function TodoList({arr_todoList, currentTeamId, fetchTodoList ,setArr_todoList}:any){
  // 전달 받은 arr_todoList를 두 배열(todo, done 으로 분리)
  let todo:any = [];
  let done:any = [];

  // arr_todoList : '팀 별로(나포함)' 할일 목록에 따른 -> 투두리스트 정보
  arr_todoList.forEach( (value:any) => {
    if(value.isDone) done.push(value)
    else todo.push(value)
  });
  
  
  return (
    <div className="todo-list">
      {/* 투두리스트 등록하기 */}
      <TodosRegist arr_todoList={arr_todoList} currentTeamId={currentTeamId} fetchTodoList={fetchTodoList} />

      {/* TODO 리스트 */}
      <div className='todo-pending'>
        <h3>TO DO</h3>
        {todo.map( (value:any) => <TodoRow value={value} key={value.todoId} fetchTodoList={fetchTodoList} /> )}
      </div>

      {/* DONE 리스트 */}
      <div className='todo-done'>
        <h3>DONE</h3>
        {done.map( (value:any) => <DoneRow value={value} key={value.todoId} fetchTodoList={fetchTodoList} /> )}
      </div>
    </div>
)
}

export default TodoList;