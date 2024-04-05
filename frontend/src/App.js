import React from 'react';
import Login from './components/Login';
import Register from "./components/Signup";
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './components/Homepage';
// import HomePage from './components/Homepage';

function App() {

  const isAuthenticated = true; 

  return (
        <Routes>
          <Route path="/" element={<Login/>} />
         
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Homepage/>} />
          
        </Routes>
  );
}

export default App;
