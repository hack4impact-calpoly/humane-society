import { React } from 'react';
import CircularProgressWithLabel from './circularProgress';

export default function Task() {
  return (
    <div>
      <CircularProgressWithLabel value={50} />
    </div>
  );
}
