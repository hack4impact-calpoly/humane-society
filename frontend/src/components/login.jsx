/* eslint-disable consistent-return */
import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
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
  const [confirmedUser, setConfirmedUser] = useState(true);

  const getEmail = async () => {
    let state;

    await setEmail((currentState) => {
      state = currentState;
      return currentState;
    });

    return state;
  };

  const getPw = async () => {
    let state;

    await setPw((currentState) => {
      state = currentState;
      return currentState;
    });

    return state;
  };

  const storeUser = (user, token) => {
    sessionStorage.setItem('userID', user.userID);
    sessionStorage.setItem('token', token);
  };

  const verifyAWS = async () => {
    console.log(await getEmail());
    const user = new CognitoUser({
      Username: await getEmail(),
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: await getEmail(),
      Password: await getPw(),
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('onSuccess: ', data);
        setConfirmedUser(true);
        // retrieve token and navigate to next page here
      },
      onFailure: (err) => {
        console.error('onFailure: ', err);
        setConfirmedUser(false);
      },
      newPasswordRequired: (data) => {
        console.log('newPasswordRequired: ', data);
        // not too sure what this is for
      },

    });
  };

  const login = useCallback(async () => {
    const loginBody = {
      email: await getEmail(),
      password: await getPw(),
    };
    verifyAWS();
    if (!confirmedUser) {
      return;
    }
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginBody),
    });
    const data = await response.json();
    console.log(data);
    storeUser(data.result.userID, data.token);
    navigate('/');
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      login();
    }
  }, [login]);

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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInvalidLogin(false);
                  setConfirmedUser(true);
                }}
                error={invalidLogin || !confirmedUser}
                helperText={!confirmedUser ? 'Please confirm your email' : ''}
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
                error={invalidLogin && confirmedUser}
                helperText={invalidLogin && confirmedUser ? 'Invalid email or password, please try again' : ''}
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
