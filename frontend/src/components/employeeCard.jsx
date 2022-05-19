/* eslint-disable */
import {
    Card, CardContent, IconButton, Collapse,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../css/employeeCard.css';

function ExpandIcon({ open }) {
    if (open === true) {
        return <ExpandMoreIcon sx={{ color: 'black' }} />;
    }
    return <ExpandLessIcon sx={{ color: 'black' }} />;
}

function EmployeeCard({
    name, time
}) {

    return (
        <div>
            <Card>
                <CardContent sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                        <h4 id="name" style={{ textAlign: 'left' }} >{name}</h4>
                        <h4 id="time" style={{ textAlign: 'right' }} >{time}</h4>

                </CardContent>
            </Card>
            <div id="lowerBorder" />
        </div>
    );
}

ExpandIcon.propTypes = {
    open: PropTypes.bool.isRequired,
};

EmployeeCard.propTypes = {
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default EmployeeCard;
