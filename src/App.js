import React from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import { Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Upload from './components/Upload/Upload';

function App() {
  return (
      <Routes>
        <Route exact path='/' element={<LoginPage/>} />
        <Route exact path='/register' element={<RegisterPage/>} />
        <Route exact path='/home' element={<Homepage/>} />
        <Route exact path='/uploadfile' element={<Upload/>} />
      </Routes>
  );
}

export default App;
