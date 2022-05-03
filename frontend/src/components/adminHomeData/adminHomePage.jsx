import { React, useState } from 'react';
import AdminCalendar from './adminCalendar';
import AdminHomeTaskbar from './adminHomeTaskbar';
import AdminMainCalendar from './adminMainCalendar';


export default function RequestOff() {
  const [date, setDate] = useState(new Date());
  const onChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <div>
      <DatePicker onChange={onChange} selected={date} />
      <AdminHomeTaskbar />
      <AdminCalendar />
      <AdminMainCalendar />
    </div>
  );
}
