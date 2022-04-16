import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Signup from './components/signup';
import './css/App.css';
import theme from './theme';
import Login from './components/login';
import ForgotPassword from './components/forgotPassword';
import PasswordReset from './components/passwordReset';
import ResetPassword from './components/resetPassword';
import RequireAuth from './requireAuth';
import SignupSuccess from './components/signupSuccess';
import Profile from './components/profile';
import Request from './components/requestOff';
import Availability from './components/availability/availability';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            { /* Public Routes */ }
            <Route path="/" element={<p>landing page</p>} />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/success" element={<SignupSuccess />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            { /* Private Routes */ }
            <Route element={<RequireAuth />}>
              <Route path="/tasks" />
              <Route path="/request-off" element={<Request />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/discussions" />
              <Route path="profile" element={<Profile />} />
            </Route>
            { /* catch all route */ }
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
export default App;
