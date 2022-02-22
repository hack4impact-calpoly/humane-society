import React from 'react';
import { Button } from '@mui/material';

export default function IndicateAvailability() {
  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          color="secondary"
        >
          + Add Availabilty
        </Button>
      </div>
    </div>
  );
}
