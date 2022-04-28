import {
  Card, Checkbox, CardContent, IconButton, Collapse,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../css/taskCard.css';

function ExpandIcon({ open }) {
  if (open === true) {
    return <ExpandMoreIcon sx={{ color: 'black' }} />;
  }
  return <ExpandLessIcon sx={{ color: 'black' }} />;
}

function TaskCard({
  checked, setChecked, name, description,
}) {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <Card>
        <CardContent sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <div id="checkAndName">
            <Checkbox value={checked} onChange={() => setChecked(!checked)} sx={{ color: 'black', '&.Mui-checked': { color: '#4AA7AC' } }} />
            <h4 id="name">{name}</h4>
          </div>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandIcon open={expand} />
          </IconButton>
        </CardContent>
        <Collapse in={expand}>
          <CardContent>
            <text id="desc">{description}</text>
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
