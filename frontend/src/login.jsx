import React from 'react';
import './css/login.css';
import { Button, Grid } from '@mui/material';
import logo from './imgs/logo.png';
import logoSmall from './imgs/logo-small.png';

export default function Login() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <img id="loginLogo" src={logo} alt="logo" />
          <p>login page</p>
          <p>another paragraph</p>
          <p>another another paragraph</p>
          <Button sx={{ color: '#4aa7ac' }}>Login</Button>
        </Grid>
        <Grid item xs={0} sm={6} style={{ background: '#1d4d71' }}>
          <img id="loginLogoSmall" src={logoSmall} alt="logo" />
        </Grid>
      </Grid>
    </div>
  );
}
