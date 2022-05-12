import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import '../css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import userPool from '../userPool';
import Navbar from '../navbar';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);

  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/;
    if (!password1.match(passwordRegex) && password1.length !== 0) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const checkCode = () => {
    setUnsuccessful(false);
  };

  const sendEmail = async () => {
    const user = new CognitoUser({
      Username: localStorage.getItem('woods-humane-email'),
      Pool: userPool,
    });

    user.forgotPassword({
      onSuccess: (data) => {
        console.log(`CodeDeliveryData from forgotPassword: ${data}`);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  const updateMongo = async () => {
    const updatePwBody = {
      email: localStorage.getItem('woods-humane-email'),
      password: password2,
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}updatePassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePwBody),
    }).then((result) => {
      console.log(result);
      if (result.status === 200) {
        console.log('success');
        localStorage.removeItem('woods-humane-email');
        navigate('/login');
      } else {
        console.log('error');
        setUnsuccessful(true);
      }
    });
  };

  const updateAWS = async () => {
    // const verificationCode = await getCode();
    const password = password2;
    const user = new CognitoUser({
      Username: localStorage.getItem('woods-humane-email'),
      Pool: userPool,
    });

    user.confirmPassword(code, password, {
      onSuccess: () => {
        console.log('Password confirmed!');
        updateMongo();
      },
      onFailure: (err) => {
        console.log('Password not confirmed!');
        console.log(err);
        setUnsuccessful(true);
      },
    });
  };

  const verifyPassword = () => {
    checkPassword();
    if (validPassword) {
      setSamePassword(false);
    } else if (password1 === password2) {
      updateAWS();
    } else {
      setSamePassword(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="forgotPasswordPage">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              mt: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} id="forgotPassword">
                Reset your password
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="code"
                  label="Enter your verification code"
                  type="code"
                  id="code"
                  autoComplete="your-code"
                  error={unsuccessful}
                  helperText={unsuccessful ? 'Please request another code, code has expired or is invalid' : ''}
                  onChange={(e) => { setCode(e.target.value); }}
                  onBlur={checkCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Enter your new password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => { setPassword1(e.target.value); }}
                  error={validPassword || unsuccessful}
                  helperText={validPassword ? 'Must contain at least one number, one uppercase, one lowercase, one special character and be atleast 8 characters' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Re-enter your new password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => { setPassword2(e.target.value); }}
                  error={samePassword || unsuccessful}
                  helperText={samePassword ? 'Passwords do not match' : ''}
                />
              </Grid>
              <Button
                type="submit"
                id="send"
                fullWidth
                variant="contained"
                sx={{ mt: 3, ml: 4 }}
                style={{
                  borderRadius: 8,
                  backgroundColor: '#21b6ae',

                }}
                onClick={verifyPassword}
              >
                Reset Password
              </Button>
              <Grid item xs={12} id="resendEmailGrid">
                Didn&apos;t receive an email?
                <Button
                  id="resendEmail"
                  variant="text"
                  onClick={sendEmail}
                  style={{
                    padding: 2,
                    color: '#069',
                    cursor: 'pointer',
                  }}
                >
                  Resend email.
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
