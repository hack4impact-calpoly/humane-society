import React from 'react';
import { Button, Grid } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';

export default function RequestOff() {
  const pendingColumns = [
    {
      field: 'id',
      headerName: 'Date(s):',
      width: 150,
    },
    {
      field: 'firstName',
      headerName: 'Shift Time',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Notes',
      width: 1000,
    },
  ];

  const pendingRows = [
    {
      id: '1/1/2022', lastName: 'Snow', firstName: 'Jon',
    },
    {
      id: '1/2/2022', lastName: 'Lannister', firstName: 'Cersei',
    },
    {
      id: '1/3/2022', lastName: 'Lannister', firstName: 'Jaime',
    },
    {
      id: '1/4/2022', lastName: 'Stark', firstName: 'Arya',
    },
    {
      id: '1/5/2022', lastName: 'Targaryen', firstName: 'Daenerys',
    },
    {
      id: '1/6/2022', lastName: 'Melisandre', firstName: null,
    },
    {
      id: '1/7/2022', lastName: 'Clifford', firstName: 'Ferrara',
    },
    {
      id: '1/8/2022', lastName: 'Frances', firstName: 'Rossini',
    },
    {
      id: '1/9/2022', lastName: 'Roxie', firstName: 'Harvey',
    },
  ];

  const reviewedColumns = [
    {
      field: 'id',
      headerName: 'Date(s):',
      width: 150,
    },
    {
      field: 'firstName',
      headerName: 'Shift Time',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Notes',
      width: 1000,
    },
  ];

  const reviewedRows = [
    {
      id: '1/1/2022', lastName: 'Snow', firstName: 'Jon',
    },
    {
      id: '1/2/2022', lastName: 'Lannister', firstName: 'Cersei',
    },
    {
      id: '1/3/2022', lastName: 'Lannister', firstName: 'Jaime',
    },
    {
      id: '1/4/2022', lastName: 'Stark', firstName: 'Arya',
    },
    {
      id: '1/5/2022', lastName: 'Targaryen', firstName: 'Daenerys',
    },
    {
      id: '1/6/2022', lastName: 'Melisandre', firstName: null,
    },
    {
      id: '1/7/2022', lastName: 'Clifford', firstName: 'Ferrara',
    },
    {
      id: '1/8/2022', lastName: 'Frances', firstName: 'Rossini',
    },
    {
      id: '1/9/2022', lastName: 'Roxie', firstName: 'Harvey',
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
            Pending
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            style={{
              borderRadius: 5,
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
            padding: '10px 50px',
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
            Reviewed
          </Grid>
        </Grid>
        <Grid
          item
          container
        >
          <div style={{
            height: 400,
            width: '100%',
            padding: '10px 50px',
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
