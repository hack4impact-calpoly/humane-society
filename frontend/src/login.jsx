import React from 'react';
import './css/login.css';
import { Button } from '@mui/material';
import logo from './imgs/logo.png';
import logoSmall from './imgs/logo-small.png';

export default function Login() {
  return (
    <div id="halfPage">
      <p>login page</p>
      <p>another paragraph</p>
      <p>another another paragraph</p>
      <img id="loginLogo" src={logo} alt="logo" />
      <br />
      <img id="loginLogoSmall" src={logoSmall} alt="logo" />
      <p>paragraph</p>
      <Button color="primary">This is a button!</Button>
      <Button>This is button 2</Button>
    </div>
  );
}
