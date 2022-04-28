/* eslint-disable */
import { React, useState } from 'react';
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
  DragDropProvider,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import AdminTaskbar from './../adminTaskbar';
import appointments from './appointments';
import '../../css/availability.css';
import TaskBar from '../taskbar';

// Change how the appointments look
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

function renderTaskBar(props) {
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (isAdmin == "true") {
        return <AdminTaskbar />;
    }
    else {
        return <TaskBar />;
    }
}

const TextEditor = (props) => {
  // disable the title
  if (props.type === 'titleTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BooleanEditor = (props) => {
  // Disable all day selector
  if (props.label === 'All Day')
    return null;
  return <AppointmentForm.BooleanEditor {...props} />;
}

export default function Availability() {
  const [data, setData] = useState(appointments); // DEFAULT IS TEST VALUES RIGHT NOW

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
      <div>   
      {renderTaskBar()}
      <div className="availabilityCalendar">
      <Scheduler data={data} height={630}>
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
        <ConfirmationDialog
          ignoreCancel
        />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm
          textEditorComponent={TextEditor}
          booleanEditorComponent={BooleanEditor}
        />
        <DragDropProvider />
      </Scheduler>
      </div>
    </div>
  );
}
