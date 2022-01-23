import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../imgs/logo.svg';
import '../css/taskbar.css';

export default function TaskBar() {
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
        <Grid item md={3} />
        <Grid item xs={7}>
          <nav>
            <Link to="/tasks">Tasks</Link>
            <Link to="/availability">Availability</Link>
            <Link to="/request-off">Request Off</Link>
            <Link to="/discussion">Discussion</Link>
          </nav>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="profile">
            <AccountCircleOutlinedIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </header>
  );
}