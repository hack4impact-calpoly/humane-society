/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import DropDownMenu from './dropDownMenu';
import logo from '../imgs/logo.svg';
import '../css/taskbar.css';

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
                        <Link to="/tasks">Tasks</Link>
                        <Link to="/request-off">Request Off</Link>
                        <Link to="/contacts">Contacts</Link>
                        <Link to="/availability">Availability</Link>
                    </nav>
                </Grid>
                <Grid item xs={1}>
                    <DropDownMenu />
                </Grid>
            </Grid>
        </header>
    );
}
