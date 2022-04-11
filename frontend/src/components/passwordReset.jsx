/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Grid, Button } from '@mui/material';
import '../css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../userPool';
import Navbar from '../navbar';

export default function PasswordReset() {
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
                Email has been sent!
              </Grid>
              <Grid item xs={12} id="enterEmailText">
                Please check your inbox for your verification code
                and a link to reset your password.
              </Grid>
              <Grid item xs={12} id="resendEmailGrid">
                Didn&apos;t receive an email?
                <Button
                  id="resendEmail"
                  variant="text"
                  onClick={sendEmail}
                  style={{
                    padding: 0,
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
