import React, { useState } from 'react';
import '../css/login.css';
import {
  Button, Grid, TextField, Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const verifyLogin = () => {
    // Add value verification with AWS Amplify here
    console.log('button pressed');
    console.log(`Email=${email} pw=${pw}`);
  };
  return (
    <div className="loginPage">
      <Container component="main" maxWidth="xs">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <img id="loginLogo" src={logo} alt="logo" />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item sx={{ width: '100%' }}>
              <TextField
                fullWidth
                id="loginEmail"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                fullWidth
                id="loginPassword"
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); }}
              />
              <p>
                <Link to="/forgotpassword" style={{ float: 'right' }}>Forgot Password?</Link>
              </p>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Button
              variant="contained"
              fullWidth
              style={{
                borderRadius: 8,
              }}
              color="secondary"
              onClick={verifyLogin}
            >
              Login
            </Button>
            <p align="left">
              Don&apos;t have an account?&nbsp;
              <Link to="/signup">Create an account here.</Link>
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
