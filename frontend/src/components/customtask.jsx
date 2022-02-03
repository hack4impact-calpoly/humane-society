/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import '../css/customtask.css';

export default function SignUp() {
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [validTask, setValidTask] = useState(false);
  const [validDescription, setValidDescription] = useState(false);

  const checkTask = () => {
    if (newTask.length === 0) {
      setValidTask(true);
    } else {
      setValidTask(false);
    }
  };
  const checkDescription = () => {
    if (description.length === 0) {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  };

  const create = () => {
    console.log(newTask, description);
  };

  return (
    <div className="customtask">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Task
          </Typography>
          <Box component="form" noValidate onSubmit={create} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="newTask"
                  required
                  fullWidth
                  id="newTask"
                  label="New Task"
                  value={newTask}
                  onChange={(e) => { setNewTask(e.target.value); }}
                  onBlur={checkTask}
                  error={validTask}
                  helperText={validTask ? 'New Tesk' : ''}

                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Task Description"
                  name="description"
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); }}
                  onBlur={checkDescription}
                  error={validDescription}
                  helperText={validDescription ? 'Please enter your last name' : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                borderRadius: 8,
                backgroundColor: '#B0B0B0',
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
