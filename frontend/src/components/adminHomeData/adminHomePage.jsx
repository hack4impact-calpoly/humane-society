import React from 'react';
import AdminCalendar from './adminCalendar';
import AdminHomeTaskbar from './adminHomeTaskbar';
import AdminMainCalendar from './adminMainCalendar';

export default function RequestOff() {
  return (
    <div>
      <AdminHomeTaskbar />
      <AdminCalendar />
      <AdminMainCalendar />
    </div>
  );
}
