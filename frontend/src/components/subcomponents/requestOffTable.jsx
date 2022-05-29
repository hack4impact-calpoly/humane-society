/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Button, Grid, Modal, Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import requestOffModal from './requestOffModal';

export default function RequestOffTable() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const pendingColumns = [
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 0.1,
      minWidth: 150,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
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

  const [pendingRows, setPendingRows] = useState([]);

  const reviewedColumns = [
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 0.1,
      minWidth: 150,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
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

  const [reviewedRows, setReviewedRows] = useState([]);

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

  const processRequest = () => {
    requestOffModal();

    displayRequestSuccess();
    displayRequestFailure();
  };

  const loadRequestOff = async () => {
    const requestOffBody = {
      userID: localStorage.getItem('userID'),
    };
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}requestOff/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestOffBody),
    });
    console.log(response);
    let data = await response.json();
    data = data.map(
      (obj) => ({
        approved: obj.approved,
        notes: obj.notes,
        userID: obj.userID,
        id: obj._id,
        startDate: new Date(obj.startDate),
        endDate: new Date(obj.endDate),
      }),
    );
    console.log(data);
    const pending = data.filter((requestOff) => requestOff.approved === 0);
    const reviewed = data.filter((requestOff) => requestOff.approved !== 0);
    setPendingRows(pending);
    setReviewedRows(reviewed);
  };

  useEffect(() => {
    loadRequestOff();
  }, []);

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
            onClick={() => { processRequest(); }}
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
