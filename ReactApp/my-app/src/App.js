import './App.css';
import Login from './pages/login.jsx';
import Tasklist from './pages/tasklist.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/tasks" element={<Tasklist/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
