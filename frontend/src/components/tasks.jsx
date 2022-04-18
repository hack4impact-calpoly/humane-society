import { React, useState } from 'react';
import DatePicker from 'sassy-datepicker';
import CircularProgressWithLabel from './circularProgress';

export default function Task() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <CircularProgressWithLabel value={50} />
      <DatePicker onChange={onChange} selected={date} />
      <p>{date.toString()}</p>
    </div>
  );
}
