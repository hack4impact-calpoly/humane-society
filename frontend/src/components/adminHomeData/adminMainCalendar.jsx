/* eslint-disable */
import { React, useState } from 'react';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Grid from '@mui/material/Grid';
import appointments from './employee';
import '../../css/adminMainCalendar.css';

function Appointment({ style, children, ...restProps }) {
  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#4aa7ac',
        borderRadius: '5px',
      }}
    >
      {children}
    </Appointments.Appointment>
  );
}

export default function AdminMainCalendar() {
  const [data, setData] = useState(appointments); // DEFAULT IS TEST VALUES RIGHT NOW
  const [date, setDate] = React.useState(new Date());
  
  const onChange = (newDate) => {
    setDate(newDate);
  };
  function handleChange(value)
  {
    <div>
      <SearchBox onChange={handleChange} />
      <NameList searchValue={searchValue} />
    </div>
  }
  // Have calendar default on current date
  const curDate = new Date();
  const defaultDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;

  // function that handles changes to data, can probably add/change/delete to db here as well
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
    <div className="availabilityCalendar">
      <Scheduler data={data} height={600}>
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
        <Appointments
          appointmentComponent={Appointment}
        />
      </Scheduler>
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
    </div>
    
  );
}
