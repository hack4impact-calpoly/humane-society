import React, { useState } from 'react';
import { Grid } from '@mui/material';
import '../css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/;
    if (!password1.match(passwordRegex) && password1.length !== 0) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
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
      },
      onFailure: (err) => {
        console.log('Password not confirmed!');
        console.log(err);
      },
    });
  };

  const updateMongo = async () => {
    const updatePwBody = {
      email: localStorage.getItem('woods-humane-email'),
      password: password2,
    };
    fetch('http://localhost:3001/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePwBody),
    }).then((result) => {
      if (result.status === 200) {
        // success
        console.log('success');
        localStorage.removeItem('woods-humane-email');
        navigate('/login');
      } else {
        console.log('error');
      }
    });
  };

  const verifyPassword = () => {
    checkPassword();
    if (validPassword) {
      setSamePassword(false);
    } else if (password1 === password2) {
      updateAWS();
      updateMongo();
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
                  onChange={(e) => { setCode(e.target.value); }}
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
                  error={validPassword}
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
                  error={samePassword}
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
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
