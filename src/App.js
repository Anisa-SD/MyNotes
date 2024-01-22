import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Alerts from './Components/Alerts';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
  },1500)
  }
  return (
    <>
    <NoteState>
    <Navbar/>
    <Alerts alert={alert}/>
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home showAlert={showAlert}/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/login' element={<Login showAlert={showAlert}/>}></Route>
      <Route path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
    </Routes>
    </div>
    </NoteState>
    </>
  );
}

export default App;
