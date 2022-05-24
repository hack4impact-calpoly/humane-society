/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import DropDownMenu from './dropDownMenu';
import logo from '../../imgs/logo.svg';
import '../../css/taskbar.css';

export default function AdminTaskbar() {
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
                        <NavLink to="/adminhomepage" activeClassName="active">Schedule</NavLink>
                        <NavLink to="/tasks-admin" activeClassName="active">Assign Tasks</NavLink>
                        <NavLink to="/request-off-admin" activeClassName="active" >Request Off</NavLink>
                        <NavLink to="/contacts" activeClassName="active">Contacts</NavLink>
                    </nav>
                </Grid>
                <Grid item xs={1}>
                    <DropDownMenu />
                </Grid>
            </Grid>
        </header>
    );
}
