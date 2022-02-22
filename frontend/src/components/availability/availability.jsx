import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import IndicateAvailability from './indicateAvailability';
import '../../css/availability.css';

const steps = [
  'Indicate Availabilty',
  'Indicate Timeframe',
  'Review and Submit',
];

export default function Availability() {
  const [activeStep, setActiveStep] = useState(0);

  /* const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }; */

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid
      className="availability"
      container
    >
      <Grid item xs={2}>
        <Box className="stepper">
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>
                  {step}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              { /* render at end of steps */ }
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Grid>
      <Grid className="mainContent" item xs={10}>
        {activeStep === 0 && (<IndicateAvailability />)}
        {activeStep === 1 && (<p>indicate timeframe</p>)}
        {activeStep === 2 && (<p>review and submit</p>)}
      </Grid>
    </Grid>
  );
}
