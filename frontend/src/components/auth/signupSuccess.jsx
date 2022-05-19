/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
import React from 'react';
import {
  Button, Grid, Box, Typography, Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../imgs/signupLogo.svg';

export default function SignupSuccess() {
  const navigate = useNavigate();
  return (
    <div className="signupSuccessPage">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <img id="signupLogo" src={logo} alt="logo" />
          </Grid>
          <Typography component="h1" variant="h5">
            Account Successfully Created!
          </Typography>
          <Typography component="h1" variant="h5">
            Check your inbox, a verification email has been sent to your email!
          </Typography>

          <Box component="form" noValidate sx={{ width: 300 }}>
            <Button
              onClick={() => navigate('/login')}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              style={{
                borderRadius: 8,
              }}
            >
              Return to login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
