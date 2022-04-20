/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Grid from '@mui/material/Grid';
import '../../css/adminCalendar.css';

export default function AdminCalendar() {
  const [date, setDate] = React.useState(new Date());
  return (
    <div style={{
      padding: '100px 10px 0px',
    }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
}
