

function TodoList() {
  // API 나/팀A... (어떤 팀이냐에 따라) => todo-list 받아오기
 
  return (
    <div className="todo-team">
      <div className="team">할 일 목록</div>
      <button className="create btn" type="button">팀 만들기</button>
    </div>
  )
}

export default TodoList