import React from 'react';
import AdminTaskBar from './adminHomeTaskbar';
import AdminCalendar from './adminCalendar';
import AdminMainCalendar from './adminMainCalendar';

export default function RequestOff() {
  return (
    <div>
      <AdminMainCalendar />
      <AdminTaskBar />
      <AdminCalendar />
    </div>
  );
}
