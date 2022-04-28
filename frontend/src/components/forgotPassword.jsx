import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import '../css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../userPool';
import Navbar from '../navbar';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const storeEmail = () => {
    localStorage.setItem('woods-humane-email', email);
  };

  const sendEmail = async () => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.forgotPassword({
      onSuccess: (data) => {
        console.log(`CodeDeliveryData from forgotPassword: ${data}`);
        storeEmail();
        navigate('/passwordreset');
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
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
                Forgot your password?
              </Grid>
              <Grid item xs={12} id="enterEmailText">
                Please enter your email address and we&apos;ll
                send you a link to reset your password shortly.
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => { setEmail(e.target.value); }}
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
                onClick={sendEmail}
              >
                Send
              </Button>
              <Grid item xs={12} sx={{ mt: -2 }}>
                <Link id="toLogin" href="/login" variant="body2">
                  Return to login.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
