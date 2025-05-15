import InputText from '../components/InputText'

function Todos() {

 
  return (
    <div className="todo-home">

       <div className="todo-team">
        <div className="btn left blue">할 일 목록</div>
        <div className="btn left blue other">팀 A의 할 일 목록</div>
        <div className="btn">팀 만들기</div>
       </div>

       <div className="todo-list">
        <div className='input-row'>
          <InputText placeholder="데브코스 강의 수강하기"/>
          <div className='btn-side'>
            <button type='button' className='btn short black'>등록하기</button>
          </div>
        </div>

        <div className='todo-pending'>
          <h3>TO DO</h3>
          <div className='input-row'>
            <div className='input left no-border todo'>데브코스 강의 수강하기</div>
            <div className='btn-side'>
              <button type='button' className='btn short color-black'>수정</button>
              <button type='button' className='btn short color-red'>삭제</button>
            </div>
          </div>
          <div className='input-row'>
            <div className='input left no-border todo'>데브코스 강의 수강하기</div>
            <div className='btn-side'>
              <button type='button' className='btn short color-black'>수정</button>
              <button type='button' className='btn short color-red'>삭제</button>
            </div>
          </div>
          <div className='input-row'>
            <div className='input left no-border todo'>데브코스 강의 수강하기</div>
            <div className='btn-side'>
              <button type='button' className='btn short color-black'>수정</button>
              <button type='button' className='btn short color-red'>삭제</button>
            </div>
          </div>
        </div>

        <div className='todo-done'>
          <h3>DONE</h3>
          <div className='input-row'>
            <div className='input left no-border done'>데브코스 강의 수강하기</div>
            <div className='btn-side'>
              <button type='button' className='btn short color-red'>삭제</button>
            </div>
          </div>
        </div>

       </div>

    </div>
  )
}

export default Todos