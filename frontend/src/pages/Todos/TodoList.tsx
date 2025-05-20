import axios from "axios";
import { useState } from "react";
import RegistTodo from "./RegistTodo";
import TodoRow from "../../components/TodoRow";
import DoneRow from "../../components/DoneRow";


function TodoList(){

// 내 투두리스트 조회
  let todoArr: any[] = []
  let doneArr: any[] = []

  async function getTodos(){
    const res = await axios.get('/todos');
    // res.data가 배열로 온다는 가정하에
    res.data.forEach( (item: any) => {
      if( !item.isDone ) todoArr.push(item)
      else doneArr.push(item)
    })
  }
  // getTodos()

  // todo/done리스트 -> mock 데이터
  todoArr = [
    {
      todoId : 1,
      contents: "나의 할일 1",
      isDone: false
    },
    {
      todoId : 2,
      contents: "나의 할일 2",
      isDone: false
    },
    {
      todoId : 3,
      contents: "나의 할일 3",
      isDone: false
    },
  ]
  doneArr = [
    {
      todoId : 4,
      contents: "움하하하하",
      isDone: true
    },
    {
      todoId : 5,
      contents: "이야호",
      isDone: true
    }
  ]
  let [todoList, setTodoList] = useState(todoArr)
  let [doneList, setDoneList] = useState(doneArr)


  return (
    <div className="todo-list">
      {/* 투두리스트 등록하기 */}
      <RegistTodo />

      {/* TODO 리스트 */}
      <div className='todo-pending'>
        <h3>TO DO</h3>
        {todoList.map( value => <TodoRow row={value} key={value.todoId} /> )}
      </div>

      {/* DONE 리스트 */}
      <div className='todo-done'>
        <h3>DONE</h3>
        {doneList.map( value => <DoneRow row={value} key={value.todoId} /> )}
      </div>
    </div>
)
}

export default TodoList;