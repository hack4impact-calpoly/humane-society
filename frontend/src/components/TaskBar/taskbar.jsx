import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import DropDownMenu from './dropDownMenu';
import logo from '../../imgs/logo.svg';
import '../../css/taskbar.css';

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
        <Grid item xs={8}>
          <nav>
            <NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
            <NavLink to="/request-off" activeClassName="active">Request Off</NavLink>
            <NavLink to="/availability" activeClassName="active">Availability</NavLink>
          </nav>
        </Grid>
        <Grid item xs={1}>
          <DropDownMenu />
        </Grid>
      </Grid>
    </header>
  );
}
