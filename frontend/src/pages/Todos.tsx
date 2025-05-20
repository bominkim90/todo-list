import TodoList from './Todos/TodoList'
import TeamList from './Todos/TeamList'

function Todos() {
  // 투두 등록하기
 
  return (
    <div className="todo-home">
      {/* 팀 목록 */}
      <TeamList />

      {/* TODO / DONE 리스트 */}
      <TodoList />

    </div>
  )
}



export default Todos