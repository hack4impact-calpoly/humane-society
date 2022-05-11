import React from 'react';
import AdminHomeTaskbar from './adminHomeTaskbar';
import AdminCalendar from './adminCalendar';

export default function AdminHomePage() {
  return (
    <div>
      <AdminHomeTaskbar />
      <AdminCalendar />
    </div>
  );
}
