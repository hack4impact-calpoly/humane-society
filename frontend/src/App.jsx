/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<p>Sign up</p>} />
          <Route path="/forgotpassword" element={<p>forgot password</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
