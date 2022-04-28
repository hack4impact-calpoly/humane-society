import React, { useState } from 'react';

import TaskCard from './taskCard';

export default function TestTasks() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <TaskCard checked={checked} setChecked={setChecked} name="task1" description="This is a description of task 1!" />
    </div>
  );
}
