import React from 'react';
import { Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import '../css/requestOffAdmin.css';
import TaskBar from './taskbar';

export default function RequestOffAdmin() {
  const curDate = new Date();
  console.log(curDate);

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

  let approvedRows = [
    {
      id: 8,
      name: 'Sam',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 9,
      name: 'Bob',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 10,
      name: 'Jane',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 11,
      name: 'Kayla',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 12,
      name: 'Jace',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 13,
      name: 'Emily',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 14,
      name: 'Raymond',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  const deniedRows = [
    {
      id: 15,
      name: 'Sam',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 16,
      name: 'Bob',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 17,
      name: 'Jane',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 18,
      name: 'Kayla',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 19,
      name: 'Jace',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 20,
      name: 'Emily',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 21,
      name: 'Raymond',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  const currentColumns = [
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
      minWidth: 200,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 0.1,
      minWidth: 200,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
      minWidth: 250,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'approve',
      headerName: '',
      flex: 0.1,
      minWidth: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          const thisRow = params.row;
          console.log(thisRow);
          // const index = currentRows.indexOf(thisRow);
          // currentRows = currentRows.splice(index, 1);
          approvedRows = approvedRows.push(thisRow);
        };

        return (
          <Button
            onClick={onClick}
            variant="contained"
            fullWidth
            style={{
              borderRadius: 8,
            }}
            color="secondary"
          >
            Approve
          </Button>
        );
      },
    },
    {
      field: 'deny',
      headerName: '',
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => {
        const onClick = (e) => {
          e.stopPropagation();
        };

        return (
          <Button
            onClick={onClick}
            variant="outlined"
            fullWidth
            style={{
              borderRadius: 8,
            }}
            color="error"
          >
            Deny
          </Button>
        );
      },
    },
  ];

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
      minWidth: 200,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 0.1,
      minWidth: 200,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
      minWidth: 250,
      sortable: false,
      disableColumnMenu: true,
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
        columns={currentColumns}
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
