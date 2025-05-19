

function TodoRow({row}: any) {
  return (
    <div className='todo-row'>
      <div className='input left no-border todo'>{row.contents}</div>
      <div className='btn-side'>
        <button type='button' className='btn short color-black' data-todo-id={row.todoId}>수정</button>
        <button type='button' className='btn short color-red'>삭제</button>
      </div>
    </div>
  )
}

export default TodoRow