/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './components/login';
import ForgotPassword from './forgotPassword';
import PasswordReset from './passwordReset';
import ResetPassword from './resetPassword';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<p>Sign up</p>} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
