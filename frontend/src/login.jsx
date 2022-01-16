import React from 'react';
import './css/login.css';
import { Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './imgs/logo.png';
import logoSmall from './imgs/logo-small.png';

export default function Login() {
  return (
    <div className="loginPage">
      {/* TODO make halves extend to end of page. container doesnt extend?
      add functionality to form
      dynamic font size */}
      <Grid
        container
        direction="row"
        alignItems="stretch"
        sx={{ height: '1000px' }}
      >
        <Grid
          item
          sm={12}
          md={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
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
            <Grid item sx={{ width: '60%' }}>
              <TextField
                fullWidth
                id="loginEmail"
                label="Email"
                placeholder="Enter your email"
              />
            </Grid>
            <Grid item sx={{ width: '60%' }}>
              <TextField
                fullWidth
                id="loginPassword"
                label="Password"
                type="password"
                placeholder="Password"
              />
              <br />
              <Link to="/forgotpassword" style={{ float: 'right' }}>Forgot Password?</Link>
            </Grid>
          </Grid>
          <Grid item style={{ width: '60%' }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="secondary"
            >
              Login
            </Button>
            <br />
            Don&apos;t have an account?&nbsp;
            <Link to="/signup">Create an account here.</Link>
          </Grid>
        </Grid>
        {/* TODO center image in grid */}
        <Grid
          item
          md={6}
          container
          sx={{ background: '#1d4d71', display: { xs: 'none', sm: 'none', md: 'block' } }}
        >
          <Grid item>
            <img id="loginLogoSmall" src={logoSmall} alt="logo" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
