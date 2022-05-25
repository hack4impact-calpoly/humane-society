import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../css/requestOffModal.css';

export default function RequestOffModal() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [validStart, setValidStart] = useState(null);
  const [validEnd, setValidEnd] = useState(null);

  const checkDate = (date) => {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return dateRegex.test(date);
  };

  const checkStartDate = () => {
    if (endDate !== '' && checkDate(startDate)) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      setValidStart(start <= end);
    } else {
      setValidStart(checkDate(startDate));
    }
  };

  const checkEndDate = () => {
    if (startDate !== '' && checkDate(endDate)) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      setValidEnd(start <= end);
    } else {
      setValidEnd(checkDate(endDate));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStartDate('');
    setEndDate('');
    setNotes('');
    setValidStart(null);
    setValidEnd(null); // clear all states
  };

  const submitRequest = () => {
    // TODO make sure start < end
    if (!validStart || !validEnd) {
      if (!validStart) {
        setValidStart(false);
      }
      if (!validEnd) {
        setValidEnd(false);
      }
      return;
    }
    console.log(startDate, endDate, notes);
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
        <DialogTitle><b>Date:</b></DialogTitle>
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
              <Grid item>
                <TextField
                  id="startDate"
                  type="date"
                  variant="standard"
                  value={startDate}
                  onChange={(e) => { setStartDate(e.target.value); }}
                  sx={{ width: 150 }}
                  error={validStart != null && !validStart}
                  onBlur={checkStartDate}
                />
              </Grid>
              <Grid item>
                to
              </Grid>
              <Grid item>
                <TextField
                  id="endDate"
                  type="date"
                  variant="standard"
                  value={endDate}
                  onChange={(e) => { setEndDate(e.target.value); }}
                  sx={{ width: 150 }}
                  error={validEnd != null && !validEnd}
                  onBlur={checkEndDate}
                />
              </Grid>
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
                onClick={handleClose}
                sx={{
                  width: 120,
                  color: 'black',
                  border: '2px black solid',
                }}
                style={{
                  borderRadius: 5,
                }}
              >
                <b>Cancel</b>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={submitRequest}
                style={{
                  borderRadius: 5,
                  minWidth: '120px',
                }}
              >
                <b>Request</b>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
