/* eslint-disable */
import React from 'react';
import RequestOffTable from './requestOffTable';
import AdminTaskbar from './adminTaskbar';
import TaskBar from './taskbar';

function renderTaskBar(props) {
    const isAdmin = localStorage.getItem('isAdmin');

    if (isAdmin == "true") {
        return <AdminTaskbar />;
    }
    else {
        return <TaskBar />;
    }
}

export default function RequestOff() {
  return (
    <div>
      {renderTaskBar()}
      <RequestOffTable />
    </div>
  );
}
