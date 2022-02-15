import React, { useState } from 'react';
import {
  Button, Grid, TextField, Container,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../userPool';
import logo from '../imgs/logo.svg';
import '../css/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  const verifyAWS = () => {
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
        return true;
        // retrieve token and navigate to next page here
      },
      onFailure: (err) => {
        console.error('onFailure: ', err);
        return false;
      },
      newPasswordRequired: (data) => {
        console.log('newPasswordRequired: ', data);
        return false;
        // not too sure what this is for
      },

    });
  };

  const login = () => {
    // login to mongo first here

    const loginBody = {
      email,
      password: pw,
    };
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginBody),
    }).then((result) => {
      console.log(result);
      if (result.status === 200 && verifyAWS()) {
        // success
        navigate('/');
      } else {
        setInvalidLogin(true);
        console.log('error');
      }
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
                onChange={(e) => { setEmail(e.target.value); setInvalidLogin(false); }}
                error={invalidLogin}
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
                onChange={(e) => { setPw(e.target.value); setInvalidLogin(false); }}
                error={invalidLogin}
                helperText={invalidLogin ? 'Invalid email or password, please try again' : ''}
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
