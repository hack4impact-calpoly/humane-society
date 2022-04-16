import React, { useState } from 'react';
import { Grid } from '@mui/material';
import '../css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../navbar';

export default function ResetPassword() {
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

  const verifyPassword = () => {
    checkPassword();
    if (validPassword) {
      setSamePassword(false);
    } else if (password1 === password2) {
      // route to next page, api call to update password
      //
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
