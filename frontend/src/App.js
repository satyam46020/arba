import React from 'react';
import Login from './components/Login';
import Register from "./components/Signup";
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import Product from './components/Product';
import Mystore from './components/Mystore';
import Profile from './components/Profile';
import Cart from './components/Cart';

function App() {

  return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Homepage/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/mystore" element={<Mystore/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
  );
}

export default App;
