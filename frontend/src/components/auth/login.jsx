/* eslint-disable */
import React, {
  useState, useRef, useCallback, useEffect, 
} from 'react';
import {
  Button, Grid, TextField, Container, Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../../userPool';
import logo from '../../imgs/logo.svg';
import '../../css/login.css';

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

    return state.trim();
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
    localStorage.setItem('userID', user.userID);
    localStorage.setItem('token', token);
  };

  const createToken = async () => {
    const loginBody = {
      email: await getEmail(),
      password: await getPw(),
    };
    const response = await fetch(process.env.REACT_APP_SERVER_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginBody),
    });
    const data = await response.json();
    storeUser(data.result, data.token);
    if (data.result.isAdmin) {
      navigate('/adminhomepage')
    } else {
      navigate('/availability');
    }
  };

  const verifyAWS = async () => {
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
        createToken();
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
    verifyAWS();
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    let isCancelled = false;

    if (initialRender.current) {
      initialRender.current = false;
    } else if (!isCancelled) {
      login();
    }

    return () => {
      isCancelled = true;
    };
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
              <Link to="/forgotpassword" style={{ float: 'right', paddingRight: '0', paddingTop: '5px' }}>
                <Typography variant="body2">
                  Forgot Password?
                </Typography>
              </Link>
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
            <Typography variant="body2" align="left" style={{ paddingTop: '5px' }}>
              Don&apos;t have an account?&nbsp;
              <Link to="/signup" style={{ float: 'right', paddingRight: '0' }}>
                <Typography variant="body2">
                  Create an account here.
                </Typography>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
