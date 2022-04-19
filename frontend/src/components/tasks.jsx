/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import DatePicker from 'sassy-datepicker';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Grid } from '@mui/material';
import CircularProgressWithLabel from './circularProgress';

export default function Task() {
  const [date, setDate] = useState(new Date());

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const setDateBack = () => {
    const yesterday = new Date(new Date().setDate(date.getDate() - 1));
    setDate(yesterday);
  };

  // selected date for calendar doesnt move
  const setDateForward = () => {
    const tomorrow = new Date(new Date().setDate(date.getDate() + 1));
    setDate(tomorrow);
  };

  return (
    <div>
      <CircularProgressWithLabel value={50} />
      <DatePicker onChange={onChange} selected={date} />
      <Grid
        className="dateSelector"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <IconButton
            aria-label="back"
            sx={{ color: '#1d4d71' }}
            size="large"
            onClick={setDateBack}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            style={{ fontWeight: 600 }}
            sx={{ color: '#1d4d71' }}
          >
            {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="forward"
            sx={{ color: '#1d4d71' }}
            size="large"
            onClick={setDateForward}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
