import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'


function App() {
  const loginFlag: boolean = true

  return (
    <div id="wrap">
      <Routes>
        <Route path="/" element={loginFlag ? <Todos /> : <Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/todos" element={<Todos />}/>
        <Route path="*" element={<div>없는 페이지에요</div>}/>
      </Routes>
    </div>
  )
}

export default App