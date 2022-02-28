/* eslint-disable react/jsx-props-no-spreading */
import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import appointments from './appointments';
import '../../css/availability.css';

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

export default function IndicateAvailability() {
  const [data, setData] = useState(appointments); // DEFAULT IS TEST VALUES RIGHT NOW

  // Have calendar default on current date
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

  useEffect(() => {
    console.log('rerendered');
  }, [data]);

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          color="secondary"
        >
          + Add Availabilty
        </Button>
      </div>
      <div style={{ padding: '5%', paddingLeft: '0px' }}>
        <Scheduler data={data} height={660}>
          <ViewState
            defaultCurrentViewName="Week"
            defaultCurrentDate={defaultDate}
          />
          <EditingState
            onCommitChanges={commitChanges}
          />
          <EditRecurrenceMenu />
          <WeekView
            startDayHour={7}
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
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm />
        </Scheduler>
      </div>
    </div>
  );
}
