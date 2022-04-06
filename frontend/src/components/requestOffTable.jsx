import React from 'react';
import { Button, Grid } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';

export default function RequestOffTable() {
  const pendingColumns = [
    {
      field: 'id',
      headerName: 'Date(s):',
      flex: 0.1,
      minWidth: 150,
    },
    {
      field: 'shiftTime',
      headerName: 'Shift Time',
      flex: 0.1,
      minWidth: 150,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
      minWidth: 100,
    },
  ];

  const pendingRows = [
    {
      id: '1/1/2022', shiftTime: 'Snow', notes: 'Jon',
    },
    {
      id: '1/2/2022', shiftTime: 'Lannister', notes: 'Cersei',
    },
    {
      id: '1/3/2022', shiftTime: 'Lannister', notes: 'Jaime',
    },
    {
      id: '1/4/2022', shiftTime: 'Stark', notes: 'Arya',
    },
    {
      id: '1/5/2022', shiftTime: 'Targaryen', notes: 'Daenerys',
    },
    {
      id: '1/6/2022', shiftTime: 'Melisandre', notes: null,
    },
    {
      id: '1/7/2022', shiftTime: 'Clifford', notes: 'Ferrara',
    },
    {
      id: '1/8/2022', shiftTime: 'Frances', notes: 'Rossini',
    },
    {
      id: '1/9/2022', shiftTime: 'Roxie', notes: 'Harvey',
    },
  ];

  const reviewedColumns = [
    {
      field: 'id',
      headerName: 'Date(s):',
      flex: 0.1,
      minWidth: 150,
    },
    {
      field: 'shiftTime',
      headerName: 'Shift Time',
      flex: 0.1,
      minWidth: 150,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
      minWidth: 100,
    },
  ];

  const reviewedRows = [
    {
      id: '1/1/2022', shiftTime: 'Snow', notes: 'Jon',
    },
    {
      id: '1/2/2022', shiftTime: 'Lannister', notes: 'Cersei',
    },
    {
      id: '1/3/2022', shiftTime: 'Lannister', notes: 'Jaime',
    },
    {
      id: '1/4/2022', shiftTime: 'Stark', notes: 'Arya',
    },
    {
      id: '1/5/2022', shiftTime: 'Targaryen', notes: 'Daenerys',
    },
    {
      id: '1/6/2022', shiftTime: 'Melisandre', notes: null,
    },
    {
      id: '1/7/2022', shiftTime: 'Clifford', notes: 'Ferrara',
    },
    {
      id: '1/8/2022', shiftTime: 'Frances', notes: 'Rossini',
    },
    {
      id: '1/9/2022', shiftTime: 'Roxie', notes: 'Harvey',
    },
  ];

  return (
    <div style={{
      padding: '30px 50px 0px',
    }}
    >
      <Grid
        container
        className="table"
        direction="column"
        justifyContent="space-between"
      >
        <Grid
          item
          container
          justifyContent="space-between"
        >
          <Grid item>
            <h3><u style={{ color: '#4aa7ac' }}>Pending</u></h3>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            style={{
              borderRadius: 5,
              maxHeight: '40px',
            }}
          >
            <b>+ Add Request Off</b>
          </Button>
        </Grid>
        <Grid
          item
          container
        >
          <div style={{
            height: 400,
            width: '100%',
            padding: '10px 70px',
          }}
          >
            <DataGrid
              autoHeight
              disableExtendRowFullWidth
              rows={pendingRows}
              columns={pendingColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </div>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
        >
          <Grid item>
            <h3><u style={{ color: '#4aa7ac' }}>Reviewed</u></h3>
          </Grid>
        </Grid>
        <Grid
          item
          container
        >
          <div style={{
            height: 400,
            width: '100%',
            padding: '10px 70px',
          }}
          >
            <DataGrid
              autoHeight
              disableExtendRowFullWidth
              rows={reviewedRows}
              columns={reviewedColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
