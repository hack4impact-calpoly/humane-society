import React, { useState } from 'react';
import {
  Button, Grid, Modal, Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function RequestOffTable() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
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

  const modalStyle = {
    display: 'flex',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  };

  function displayRequestSuccess() {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  function displayRequestFailure() {
    setShowFailure(true);
    setTimeout(() => setShowFailure(false), 2000);
  }

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
            onClick={() => { displayRequestSuccess(); displayRequestFailure(); }}
          >
            <b>+ Add Request Off</b>
          </Button>
          <Modal open={showSuccess} onClose={() => setShowSuccess(false)}>
            <Box style={modalStyle}>
              <CheckCircleIcon sx={{ color: '#4AA7AC', fontSize: 100 }} />
              <text style={{
                fontWeight: 'bold', fontSize: 30, marginTop: 10, marginBottom: 10,
              }}
              >
                Successfully Submitted!
              </text>
              <text style={{ fontSize: 15 }}>
                You&apos;re request off will be reviewed shortly.
              </text>
            </Box>
          </Modal>
          <Modal open={showFailure} onClose={() => setShowFailure(false)}>
            <Box style={modalStyle}>
              <CancelIcon sx={{ color: '#A33D56', fontSize: 100 }} />
              <text style={{
                fontWeight: 'bold', fontSize: 30, marginTop: 10, marginBottom: 10,
              }}
              >
                An error has occured.
              </text>
            </Box>
          </Modal>
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
