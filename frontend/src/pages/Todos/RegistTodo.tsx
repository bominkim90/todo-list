

function RegistTodo(){

  return (
    <div className='todo-row'>
      <input className="input" type="text" placeholder="투두리스트 등록하기" />
      <div className='btn-side'>
        <button type='button' className='btn short black'>등록하기</button>
      </div>
    </div>
  )
}

export default RegistTodo;