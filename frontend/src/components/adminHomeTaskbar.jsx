import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../imgs/logo.svg';

export default function adminHomePage() {
  return (
    <header className="taskBar">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={1}>
          <img id="logo" src={logo} alt="Woods Human Society Logo" />
        </Grid>
        <Grid item xs={8}>
          <nav>
            <Link to="/tasks">Tasks</Link>
            <Link to="/request-off">Request Off</Link>
            <Link to="/discussion">Discussion</Link>
            <Link to="/availability">Scheduler</Link>
          </nav>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="profile">
            <AccountCircleOutlinedIcon color="grey" />
          </IconButton>
        </Grid>
      </Grid>
    </header>
  );
}
