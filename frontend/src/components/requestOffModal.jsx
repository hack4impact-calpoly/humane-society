import React, { useState } from 'react';
import { Button, TextField } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function RequestOffModal() {
  const [open, setOpen] = useState(false);
  // const [startDate, setStartDate] = useState(''); // set default to today
  // const [endDate, setendDate] = useState('');
  // const [notes, setNotes] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitRequest = () => {
    // console.log(startDate, endDate, notes);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        + Add request off
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><b>Date(s):</b></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="notes"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClose}
            sx={{
              width: 100,
              color: 'black',
              border: '1px black solid',
            }}
            style={{
              borderRadius: 0,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={submitRequest}
            style={{
              borderRadius: 0,
              minWidth: '100px',
            }}
          >
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
