import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../css/requestOffAdmin.css';
import TaskBar from './taskbar';

export default function RequestOffAdmin() {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.1,
      minWidth: 250,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 0.1,
      minWidth: 250,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 0.1,
      minWidth: 250,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
      minWidth: 250,
    },
  ];

  const currentRows = [
    {
      id: 1,
      name: 'Sam',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 2,
      name: 'Bob',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 3,
      name: 'Jane',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 4,
      name: 'Kayla',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 5,
      name: 'Jace',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 6,
      name: 'Emily',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 7,
      name: 'Raymond',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  const approvedRows = [
    {
      id: 1,
      name: 'Sam',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 2,
      name: 'Bob',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 3,
      name: 'Jane',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 4,
      name: 'Kayla',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 5,
      name: 'Jace',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 6,
      name: 'Emily',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 7,
      name: 'Raymond',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  const deniedRows = [
    {
      id: 1,
      name: 'Sam',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 2,
      name: 'Bob',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 3,
      name: 'Jane',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 4,
      name: 'Kayla',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 5,
      name: 'Jace',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 6,
      name: 'Emily',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 7,
      name: 'Raymond',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  return (
    <div style={{
      padding: '30px 50px 0px',
    }}
    >
      <TaskBar />
      <h3>Current</h3>
      <DataGrid
        autoHeight
        disableExtendRowFullWidth
        rows={currentRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
      />
      <h3>Approved</h3>
      <DataGrid
        autoHeight
        disableExtendRowFullWidth
        rows={approvedRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
      />
      <h3>Denied</h3>
      <DataGrid
        sx={{ bgcolor: 'lightgray' }}
        autoHeight
        disableExtendRowFullWidth
        rows={deniedRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </div>
  );
}
