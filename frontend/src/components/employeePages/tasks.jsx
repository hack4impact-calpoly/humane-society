/* eslint-disable */
import { React, useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Grid } from '@mui/material';
import CircularProgressWithLabel from '../subcomponents/circularProgress';
import TaskCard from '../subcomponents/taskCard';
import Taskbar from '../TaskBar/taskbar';
import '../../css/tasks.css';

export default function Task() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState(new Map());
  const [completion, setCompletion] = useState(0);
  
  const getTasks = async () => {
    const startDate = new Date(date);
    startDate.setUTCHours(0,0,0,0);
    const endDate = new Date(date);
    endDate.setUTCHours(23,59,59,999);
    const taskBody = {
      token: localStorage.getItem('token'),
      userID: localStorage.getItem('userID'),
      startDate: startDate.toISOString().slice(0, -1) + '+00:00',
      endDate: endDate.toISOString().slice(0, -1) + '+00:00'
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}task/getTasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskBody),
      });
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (taskID, completed) => {
    const statusBody = {
      token: localStorage.getItem('token'),
      taskID,
      completed
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}task/updateStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusBody),
    })
      .catch((err) => {
        console.log(err);
      });
  }

  const initChecked = () => {
    const newMap = new Map();
    tasks.forEach((task) => {
      newMap.set(task._id, task.completed);
    });
    setChecked(newMap);
  }

  useEffect(() => {
    getTasks()
  }, [date]);

  useEffect(() => {
    initChecked();
  }, [tasks]);

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const setDateBack = () => {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    setDate(yesterday);
  };

  const setDateForward = () => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  };

  const getChecked = (taskID) => {
    // returns if a task is checked, false if not in checked map
    const isChecked = checked.get(taskID);
    return isChecked;
  };

  const getNumComplete = () => {
    let numComplete = 0;
    checked.forEach((value, key) => {
      if (value === true) {
        numComplete += 1;
      }
    });
    return numComplete;
  };

  const onCheckedChange = (taskID, isChecked) => {
    const temp = new Map(checked);
    if (isChecked) {
      temp.set(taskID, true);
    } else {
      temp.set(taskID, false);
    }
    updateStatus(taskID, isChecked);
    setChecked(temp);
  };

  useEffect(() => {
    // determine completion progress when checked is changed
    const numTasks = tasks.length ? tasks.length : 1; // prevent division by 0
    const numComplete = getNumComplete();
    setCompletion(Math.floor((numComplete / numTasks) * 100));
  }, [checked]);

  return (
    <div>
      <Taskbar />
      <Grid
        className="main"
        container
        direction="row"
        spacing={0.5}
      >
        <Grid item lg={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} color="secondary" />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          lg={3}
          md={4}
          xs={4}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item sx={{ paddingBottom: 10 }}>
            <Grid
              className="dateSelector"
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <IconButton
                  aria-label="back"
                  sx={{ color: '#1d4d71' }}
                  size="large"
                  onClick={setDateBack}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  style={{ fontWeight: 600 }}
                  sx={{ color: '#1d4d71' }}
                >
                  {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="forward"
                  sx={{ color: '#1d4d71' }}
                  size="large"
                  onClick={setDateForward}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CircularProgressWithLabel value={completion} />
          </Grid>
        </Grid>
        <Grid item lg={6} md={8} xs={8} sx={{ paddingTop: 5, paddingBottom: 3 }}>
          <Typography variant="body1" id="subtitle" align="right">
            {`${getNumComplete()}/${tasks.length} tasks completed`}
          </Typography>
          {(tasks.length === 0)
            ? <Typography variant="h5" sx={{ pt: 5 }}>No tasks assigned</Typography>
            : tasks.map((task, index) => (
              <div key={index}>
                <TaskCard
                  taskID={task._id}
                  name={task.title}
                  description={task.description}
                  checked={getChecked(task._id)}
                  setChecked={onCheckedChange}
                />
              </div>
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
