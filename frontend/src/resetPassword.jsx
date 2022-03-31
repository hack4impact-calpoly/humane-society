import React from 'react';
import { Grid } from '@mui/material';
import './css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from './navbar';

export default function ResetPassword() {
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
                  name="password"
                  label="Enter your new password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
                Reset Password
              </Button>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
