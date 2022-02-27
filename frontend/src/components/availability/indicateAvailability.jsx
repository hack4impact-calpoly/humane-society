/* eslint-disable react/jsx-props-no-spreading */
import { React } from 'react';
import { Button } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
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
  // Have calendar default on current date
  const curDate = new Date();
  const defaultDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;

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
        <Scheduler data={appointments} height={660}>
          <ViewState
            defaultCurrentViewName="Week"
            defaultCurrentDate={defaultDate}
          />
          <WeekView
            startDayHour={8}
            endDayHour={17}
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
          <AppointmentForm
            readOnly
          />
        </Scheduler>
      </div>
    </div>
  );
}
