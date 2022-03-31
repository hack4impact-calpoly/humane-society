import React from 'react';
import { Grid } from '@mui/material';
import './css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Navbar from './navbar';

export default function ForgotPassword() {
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
