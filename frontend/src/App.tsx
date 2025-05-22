import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Todos from './pages/Todos/TodosIndex';
// import LoginCheck from './util/LoginCheck';


function App() {

  return (
    <div id="wrap">
      <Routes>
        <Route path="/" element={<Login />}/>
        {/* <Route path="/" element={ <LoginCheck><Todos /></LoginCheck>} /> */}
        <Route path="/todos" element={ <Todos />} />
        <Route path="/login" element={ <Login />}/>
        <Route path="/signup" element={ <SignUp />}/>
        <Route path="*" element={<div>없는 페이지에요.</div>}/>
      </Routes>
    </div>
  )
}

export default App