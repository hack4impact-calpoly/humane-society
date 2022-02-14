import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../css/requestOffModal.css';

export default function RequestOffModal() {
  const [open, setOpen] = useState(false);
  // const [startDate, setStartDate] = useState(''); // set default to today
  // const [endDate, setendDate] = useState('');
  const [notes, setNotes] = useState('');

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
          <Grid
            container
            className="body"
            direction="column"
            justifyContent="space-between"
          >
            <Grid
              item
              container
              justifyContent="space-between"
            >
              <p>date1</p>
              <p>to</p>
              <p>date2</p>
            </Grid>
            <Grid item>
              <TextField
                id="notes"
                label="Notes"
                multiline
                fullWidth
                rows={6}
                value={notes}
                onChange={(e) => { setNotes(e.target.value); }}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleClose}
                sx={{
                  width: 100,
                  color: 'black',
                  border: '2px black solid',
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
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
