import React from 'react';
import Login from './components/Login';
import Register from "./components/Signup";
import { Route, Routes } from 'react-router-dom';

function App() {

  const isAuthenticated = true; 

  return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
         
          
        </Routes>
  );
}

export default App;
