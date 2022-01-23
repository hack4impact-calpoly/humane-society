/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './components/login';
import TaskBar from './components/taskbar';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <TaskBar />
          <Routes>
            <Route path="/" element={<p>landing page</p>} />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<p>Sign up</p>} />
            <Route path="/forgotpassword" element={<p>forgot password</p>} />
            <Route path="/tasks" />
            <Route path="/availability" />
            <Route path="/request-off" />
            <Route path="/discussions" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
