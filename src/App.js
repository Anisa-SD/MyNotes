import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <>
    <NoteState>
    <Navbar/>
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
    </Routes>
    </div>
    </NoteState>
    </>
  );
}

export default App;
