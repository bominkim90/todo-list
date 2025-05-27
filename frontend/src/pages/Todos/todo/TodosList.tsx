import TodosRegist from "./TodosRegist";
import TodoRow from "./TodoRow";
import type {Todo} from '../../../types/todo';

type TodoListProps = {
  arr_todoList: Todo[];
  currentTeamId: number;
  fetchTodoList: () => Promise<void>;
}


// 투두리스트 등록하기 / TO DO 목록 / DONE 목록
function TodoList(props: TodoListProps){
  const {arr_todoList, currentTeamId, fetchTodoList} = props;

  // 전달 받은 arr_todoList를 두 배열(todo, done 으로 분리)
  const todo = arr_todoList.filter(value => !value.isDone);
  const done = arr_todoList.filter(value => value.isDone);

  
  return (
    <div className="todo-list">
      {/* 투두리스트 등록하기 */}
      <TodosRegist currentTeamId={currentTeamId} fetchTodoList={fetchTodoList} />

      {/* TODO 리스트 */}
      <div className='todo-pending'>
        <h3>TO DO</h3>
        {todo.length === 0
          ? <p className="color-gray">할 일 항목이 없습니다.</p>
          : todo.map( (todoValue: Todo) => <TodoRow key={todoValue.id} currentTeamId={currentTeamId} todoItem={todoValue} fetchTodoList={fetchTodoList} /> )
        }
      </div>

      {/* DONE 리스트 */}
      <div className='todo-done'>
        <h3>DONE</h3>
        {done.length === 0
          ? <p className="color-gray">할 일 항목이 없습니다.</p>
          : done.map( (todoValue: Todo) => <TodoRow key={todoValue.id} currentTeamId={currentTeamId} todoItem={todoValue} fetchTodoList={fetchTodoList} /> )
        }
      </div>
    </div>
  )
}

export default TodoList;