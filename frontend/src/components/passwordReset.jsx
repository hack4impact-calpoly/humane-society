/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Grid, Button } from '@mui/material';
import '../css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';

export default function PasswordReset() {
  const navigate = useNavigate();

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
                Please check your inbox for your verification code.
              </Grid>
              <Grid item xs={12} id="resetPasswordGrid">
                Ready to reset your password?
                <Button
                  id="resetPassword"
                  variant="text"
                  onClick={() => navigate('/resetpassword')}
                  style={{
                    padding: 2,
                    color: '#069',
                    cursor: 'pointer',
                  }}
                >
                  Click here.
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
