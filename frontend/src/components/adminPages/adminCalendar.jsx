/* eslint-disable */
import { React, useState, useEffect } from 'react';
import { ViewState, EditingState, Resources } from '@devexpress/dx-react-scheduler';
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
import '../../css/availability.css';
import { appointment, resourcesData } from './employee.js';


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
  const [data, setData] = useState([]);
  const [resources, setResources] = useState([
    {
      fieldName: 'employeeId',
      title: 'Employee',
      instances: data,
    },
  ],);
  const getAppointments = async () => {
    const availabilityBody = {
      userID: localStorage.getItem('userID'),
      token: localStorage.getItem('token'),
      startDate: startDate.toISOString().slice(0, -1) + '+00:00',
      endDate: endDate.toISOString().slice(0, -1) + '+00:00'
    };

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}availability/getAvailabilities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(availabilityBody),
    })
    var data = await response.json();
    data = data.map((availability) => (
      {
        id: availability._id,
        userID: availability.userID,
        rRule: availability.rRule,
        exDate: availability.exDate.join(','),
        startDate: new Date(availability.startDate),
        endDate: new Date(availability.endDate)
      }))
    return data
  }

  useEffect( () => {
    getAppointments().then((data) => {
      setData(data)
    })

  }, [])

  // Have calendar default on current date
  const curDate = new Date();
  const defaultDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;

  // function that handles changes to data
  const commitChanges = async ({ added, changed, deleted }) => {
    let newData = data;
    if (added) {
      const appointmentBody = { userID: localStorage.getItem('userID'), ...added };
      const response = await fetch('http://localhost:3001/availability/newAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentBody),
      })
      const result = await response.json();
      newData = [...newData, {id: result._id, ...added }]
      setData(newData);
    }
    if (changed) {
      const appointmentID = Object.keys(changed)[0]
      const oldAppointment = newData.filter((appointment) => (changed[appointment.id]))[0]
      const appointmentBody = {
        _id: appointmentID, ...oldAppointment, ...changed[appointmentID],
      }
      fetch('http://localhost:3001/availability/updateAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentBody),
      }).then((result) => {
        if (result.status === 200) {
          newData = newData.map((appointment) => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          setData(newData);
        } else {
          console.log('error; could not update');
        }
      })
      
    }
    if (deleted !== undefined) {
      fetch('http://localhost:3001/availability/deleteAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id: deleted}),
      }).then((result) => {
        if (result.status === 200) {
          newData = newData.filter((appointment) => appointment.id !== deleted);
          setData(newData);
        } else {
          console.log('error; could not delete');
        }
      })
    }
  };

  return (
      <div>   
      <div style={{
      padding: '1% 10% 10%',
    }}
    >
      <Scheduler className="availabilityCalendar" dataSource={appointment} height={610}>
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
          dataSource={data}
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
         <Resources
            data={resources}
            mainResourceName="employeeId"
          />
        <DragDropProvider />
      </Scheduler>
      </div>
    </div>
  );
}
