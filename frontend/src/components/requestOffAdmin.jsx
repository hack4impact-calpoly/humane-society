import { React, useState } from 'react';
import { Button, Switch } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import '../css/requestOffAdmin.css';

export default function RequestOffAdmin() {
  const curDate = new Date();
  console.log(curDate);

  const curRows = [
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

  const appRows = [
    {
      id: 8,
      name: 'Jonathan',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 9,
      name: 'Micah',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 10,
      name: 'Iris',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 11,
      name: 'Cole',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 12,
      name: 'Sage',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 13,
      name: 'Sameera',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 14,
      name: 'Tim',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  const denRows = [
    {
      id: 15,
      name: 'Pearce',
      startDate: '1/1/2022',
      endDate: '1/3/2022',
      notes: 'Family emergency',
    },
    {
      id: 16,
      name: 'Andrew',
      startDate: '12/10/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 17,
      name: 'Nadeem',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: 'Vacation',
    },
    {
      id: 18,
      name: 'Daniel',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 19,
      name: 'Zerlan',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 20,
      name: 'Jessica',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
    {
      id: 21,
      name: 'Joseph',
      startDate: '12/9/2021',
      endDate: '12/10/2021',
      notes: '',
    },
  ];

  const [currentRows, setCurrentRows] = useState(curRows);
  const [approvedRows, setApprovedRows] = useState(appRows);
  const [deniedRows, setDeniedRows] = useState(denRows);

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
          const thisRow = currentRows.find((o) => o.id === params.row.id);
          const index = currentRows.indexOf(thisRow);
          const tempArray = [...currentRows];
          tempArray.splice(index, 1);
          setCurrentRows(tempArray);
          setApprovedRows([...approvedRows, thisRow]);
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
      renderCell: (params) => {
        const onClick = () => {
          const thisRow = currentRows.find((o) => o.id === params.row.id);
          console.log(thisRow);
          const index = currentRows.indexOf(thisRow);
          const tempArray = [...currentRows];
          tempArray.splice(index, 1);
          setCurrentRows(tempArray);
          setDeniedRows([...deniedRows, thisRow]);
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
      padding: '30px 50px 50px',
    }}
    >
      <Switch defaultChecked />
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
