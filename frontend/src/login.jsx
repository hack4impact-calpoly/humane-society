import React from 'react';
import './css/login.css';
import { Button, Grid, TextField } from '@mui/material';
import logo from './imgs/logo.png';
import logoSmall from './imgs/logo-small.png';

export default function Login() {
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={12} sm={6}>
          <Grid container direction="column">
            <img id="loginLogo" src={logo} alt="logo" />
            <TextField
              id="loginEmail"
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              id="loginPassword"
              label="Password"
              type="password"
              placeholder="Password"
            />
            <p>Forgot Password?</p>
            <Button sx={{ color: '#4aa7ac' }}>Login</Button>
            <p>Don&apos;t have an account? Create an account here.</p>
          </Grid>
        </Grid>
        {/* TODO make second half disappear in xs screens (for mobile) and extend to end of page */}
        <Grid item xs={0} sm={6} style={{ background: '#1d4d71' }}>
          <img id="loginLogoSmall" src={logoSmall} alt="logo" />
        </Grid>
      </Grid>
    </div>
  );
}
