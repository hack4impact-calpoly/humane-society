import React from 'react';
import AdminCalendar from './adminCalendar';
import AdminTaskbar from '../TaskBar/adminTaskbar';

export default function AdminHomePage() {
  return (
    <div>
      <AdminTaskbar />
      <AdminCalendar />
    </div>
  );
}
