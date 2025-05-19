
function DoneRow({row}:any) {

  return (
    <div className='todo-row'>
      <div className='input left no-border done'>{row.contents}</div>
      <div className='btn-side'>
        <button type='button' className='btn short color-red'>삭제</button>
      </div>
    </div>
  )
}

export default DoneRow