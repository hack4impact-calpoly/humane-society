/* eslint-disable */
/* eslint-disable react/prop-types */
import {
    Card, CardContent, IconButton, Collapse, Typography, Button
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../../css/taskCard.css';

function ExpandIcon({ open }) {
    if (open === true) {
        return <ExpandMoreIcon sx={{ color: 'black' }} />;
    }
    return <ExpandLessIcon sx={{ color: 'black' }} />;
}

function TaskCard({
    taskID, setChecked, name, description,
}) {
    const [expand, setExpand] = useState(false);

    return (
        <div>
            <Card>
                <CardContent sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        sx={{
                            display: 'flex',
                            pt: '.6rem',
                        }}
                    >
                        {name}
                    </Typography>
                    <div>
                    <Button
                        onClick={() => setChecked(taskID, name, description)}
                        variant="contained"
                        style={{
                            borderRadius: 10,
                        }}
                        color="secondary"
                    >
                        Edit
                    </Button>
                    <IconButton onClick={() => setExpand(!expand)}>
                        <ExpandIcon open={expand} />
                    </IconButton>
                    </div>
                </CardContent>
                <Collapse in={expand}>
                    <CardContent>
                        <p id="desc">{description}</p>

                    </CardContent>
                </Collapse>
            </Card>
            <div id="lowerBorder" />
        </div>
    );
}

ExpandIcon.propTypes = {
    open: PropTypes.bool.isRequired,
};

TaskCard.propTypes = {
    checked: PropTypes.bool.isRequired,
    setChecked: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default TaskCard;