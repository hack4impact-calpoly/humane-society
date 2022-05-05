/* eslint-disable */
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
import Contacts from './components/contacts';
import { Fragment } from 'react';
import Task from './components/tasks';
import RequestAdmin from './components/requestOffAdmin';

/* only allow admins and employees to see certain pages */
function determineRoutes(props) {
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (isAdmin == "true") {
        console.log("0")

        return
        (
            <Fragment>
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/request-off-admin" element={<RequestAdmin />} />
                <Route path="/adminhomepage" />
                <Route path="/admin-tasks" />
            </Fragment >
        )
    }
    
}

function determineRoutes1(props) {
    const isAdmin = localStorage.getItem('isAdmin');

    if (isAdmin == "false") {
        console.log("0")

        return
        (
            <Fragment>
                <Route path="/availability" element={<Availability />} />
                <Route path="/tasks" element={<Task />} />
                <Route path="/request-off" element={<Request />} />
            </Fragment>
        )
    }
    console.log("3")

}



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
                {determineRoutes1()}
              

              <Route path="/profile" element={<Profile />} />
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
