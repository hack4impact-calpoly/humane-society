/* eslint-disable */
import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Signup from './components/auth/signup';
import './css/App.css';
import theme from './theme';
import Login from './components/auth/login';
import ForgotPassword from './components/auth/forgotPassword';
import PasswordReset from './components/auth/passwordReset';
import ResetPassword from './components/auth/resetPassword';
import RequireAuth from './requireAuth';
import SignupSuccess from './components/auth/signupSuccess';
import Profile from './components/sharedPages/profile';
import Request from './components/employeePages/requestOff';
import Availability from './components/employeePages/availability';
import Contacts from './components/adminPages/contacts';
import { Fragment } from 'react';
import AdminTasks from './components/adminPages/admintasks';
import Task from './components/employeePages/tasks';
import RequestAdmin from './components/adminPages/requestOffAdmin';
import AdminHomePage from './components/adminPages/adminHomePage';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    /* helps to only allow admins and employees to see certain pages */
    const getIsAdmin = async () => {
        try {
            const body = {
                token: localStorage.getItem('token'),
                userID: localStorage.getItem('userID'),
            };
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}getUsers/isAdmin`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const admin = await response.json();
            setIsAdmin(admin)
        } catch {
            console.log('Error in finding isAdmin');
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        getIsAdmin();
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        { /* Public Routes */}
                        <Route path="/" element={<Signup />} />
                        <Route path="/login" element={<Login />} exact />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signup/success" element={<SignupSuccess />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        <Route path="/passwordreset" element={<PasswordReset />} />
                        <Route path="/resetpassword" element={<ResetPassword />} />
                        { /* Private Routes */}
                        <Route element={<RequireAuth />}>
                            {isAdmin ?
                                (<Fragment> <Route path="/contacts" element={<Contacts />} />
                                     <Route path="/request-off-admin" element={<RequestAdmin />} />
                                     <Route path="/adminhomepage" element={<AdminHomePage />} />
                                     <Route path="/admin-tasks" element={<AdminTasks />} />
                                     <Route path="/profile" element={<Profile />} />
                                </Fragment>)
                                :
                                (<Fragment>
                                    <Route path="/availability" element={<Availability />} />a
                                    <Route path="/tasks" element={<Task />} />
                                    <Route path="/request-off" element={<Request />} />
                                    <Route path="/profile" element={<Profile />} />
                                </Fragment>)}
                        </Route>
                        { /* catch all route */}
                        <Route path="*" element={<h1>404 page not found</h1>} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}
export default App;
