import React, { useState } from 'react';
import '../css/login.css';
import {
  Button, Grid, TextField, Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../userPool';
import logo from '../imgs/logo.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const login = () => {
    if (email.length === 0 || pw.length === 0) {
      console.log('invalid login');
      return;
    }

    // login to mongo first here

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: pw,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('onSuccess: ', data);
        // retrieve token and navigate to next page here
      },
      onFailure: (err) => {
        console.error('onFailure: ', err);
      },
      newPasswordRequired: (data) => {
        console.log('newPasswordRequired: ', data);
        // not too sure what this is for
      },
    });
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
                required
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
                required
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
              onClick={login}
              variant="contained"
              fullWidth
              style={{
                borderRadius: 8,
              }}
              color="secondary"
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
