/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import {
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import Grid from '@mui/material/Grid';
import appointments from './employee';
import '../../css/adminCalendar.css';

export default function AllCalendars() {
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState(appointments);
  const curDate = new Date();
  const defaultDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;
  const commitChanges = ({ added, changed, deleted }) => {
    let newData = data;
    if (added) {
      const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
      newData = [...newData, { id: startingAddedId, ...added }];
    }
    if (changed) {
      newData = newData.map((appointment) => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted !== undefined) {
      newData = newData.filter((appointment) => appointment.id !== deleted);
    }
    setData(newData);
  };
  return (
    <div style={{
      padding: '100px 10px 0px',
    }}
    >
      <LocalizationProvider className="adminCalendar" dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Scheduler className="availabilityCalendar" data={appointments} height={600}>
        <ViewState
          defaultCurrentViewName="Week"
          defaultCurrentDate={defaultDate}
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <EditRecurrenceMenu />
        <WeekView
          startDayHour={6}
          dataSource={appointments}
          endDayHour={18}
          cellDuration={60}
        />
        <MonthView
          intervalCount={0.8}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
      </Scheduler>
    </div>
  );
}
