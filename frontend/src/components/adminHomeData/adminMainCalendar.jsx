import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';

export default function AdminMainCalendar() {
  const currentDate = new Date(2021, 5, 2, 11, 30);
  const groups = ['employeeID'];
  const views = ['month'];
  return (
    <Scheduler
      timeZone="America/Los_Angeles"
      groups={groups}
      views={views}
      defaultCurrentView="month"
      defaultCurrentDate={currentDate}
      height={600}
      showAllDayPanel
      firstDayOfWeek={1}
      startDayHour={8}
      endDayHour={18}
    >
      <Resource
        label="Employee"
        fieldExpr="employeeID"
        allowMultiple={false}
      />
    </Scheduler>
  );
}
