/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
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
import appointments from './employee';
import '../../css/adminCalendar.css';

export default function AllCalendars() {
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(new Date());
  const curDate = new Date();
  const defaultDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;

  return (
    <div style={{
      padding: '100px 10px 0px',
    }}
    >
      <Scheduler className="availabilityCalendar" data={appointments} height={600}>
        <ViewState
          defaultCurrentViewName="Week"
          defaultCurrentDate={defaultDate}
        />
        <EditingState
          onChange={(newDate) => setDate(newDate)}
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
