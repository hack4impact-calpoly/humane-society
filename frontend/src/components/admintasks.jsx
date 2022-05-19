/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable */
import { React, useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Grid } from '@mui/material';
import CircularProgressWithLabel from './subcomponents/circularProgress';
import TaskCard from './subcomponents/taskCard';
import EmployeeCard from './employeeCard';

import AdminTaskBar from './TaskBar/adminTaskbar';
import '../css/tasks.css';

const testTasks = [
    {
        name: 'task1',
        time: '8-9',
    },
    {
        name: 'task2',
        time: '10-11',
    },
    {
        name: 'task3',
        time: '5-6',
    },

];

const testEmployees = [
    {
        name: 'Sage',
    },
    {
        name: 'Tom',
    },
    {
        name: 'Dave',
    }

];

export default function Task() {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState(testTasks);
    const [checked, setChecked] = useState(new Map()); // will need to loop over tasks to init map
    const [completion, setCompletion] = useState(0);
    let [employee, setEmployee] = useState(0);
    let [employeelist, setEmployeeList] = useState([]);


    const getSchedulesForDay = async () => {
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);
        const taskBody = {
            token: localStorage.getItem('token'),
            weekStart: startDate.toISOString().slice(0, -1) + '+00:00',
            weekEnd: endDate.toISOString().slice(0, -1) + '+00:00'
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}schedule/getWeekSchedules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskBody),
            });
            const data = await response.json();
            setEmployeeList(data);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(employeelist)


    useEffect(() => {
        // fetch date's tasks and update state
        // setTasks(testTasks);
        getSchedulesForDay()
        console.log(employeelist.at(0))
    }, [date]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const setDateBack = () => {
        setEmployee(0);
        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        setDate(yesterday);
    };

    const setDateForward = () => {
        setEmployee(0);
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow);
    };

    const setEmployeeForward = () => {

        if (employee < employeelist.length -1) {
            const next = employee + 1;
            employee += 1;
            setEmployee(next);
        }
        
    };
    const setEmployeeBack = () => {
        const back = employee - 1;
        
        if (back >= 0) {
            employee -= 1;
            setEmployee(back);
        }
        
    };


    const getChecked = (title) => {
        // returns if a task is checked, false if not in checked map
        const isChecked = checked.get(title);
        return isChecked || false;
    };

    const getNumComplete = () => {
        let numComplete = 0;
        checked.forEach((key, value) => {
            if (value) {
                numComplete += 1;
            }
        });
        return numComplete;
    };

    const onCheckedChange = (title, isChecked) => {
        const temp = new Map(checked);
        if (isChecked) {
            temp.set(title, isChecked);
        } else {
            temp.delete(title);
        }
        setChecked(temp);
    };
    function GetPropertyValue(obj1, dataToRetrieve) {
        return dataToRetrieve
            .split('.') // split string based on `.`
            .reduce(function (o, k) {
                return o && o[k]; // get inner property if `o` is defined else get `o` and return
            }, obj1) // set initial value as object
    }

    useEffect(() => {
        // determine completion progress when checked is changed
        const numTasks = tasks.length;
        const numComplete = getNumComplete();
        setCompletion(Math.floor((numComplete / numTasks) * 100));
    }, [checked]);

    return (
        <div>
            <AdminTaskBar />
            <Grid
                className="main"
                container
                direction="row"
                spacing={0.5}
            >

                <Grid item lg={3} sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'block' } }}>
                    <Grid item>
                        <Typography
                            variant="h5"
                            style={{ fontWeight: 600 }}
                            sx={{ color: '#1d4d71' }}
                        >
                            <IconButton
                                aria-label="back"
                                sx={{ color: '#1d4d71' }}
                                size="large"
                                onClick={setDateBack}>
                                <ArrowBackIosIcon />

                            </IconButton>

                            {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                            <IconButton
                                aria-label="forward"
                                sx={{ color: '#1d4d71' }}
                                size="large"
                                onClick={setDateForward}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Typography>

                    </Grid>

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
                        <Typography
                            variant="h5"
                            style={{ fontWeight: 600 }}
                            sx={{ color: '#1d4d71' }}
                        >
                            {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}

                        </Typography>

                        <Grid
                            className="dateSelector"
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            wrap="nowrap"
                        >

                        </Grid>
                    </Grid>

                </Grid>
                <Grid item lg={6} md={8} xs={8} sx={{ paddingTop: 5, paddingBottom: 3 }}>


                    
                    <Typography
                        variant="h5"
                        style={{ fontWeight: 600 }}
                        sx={{ color: '#1d4d71' }}
                    >
                        <IconButton
                            aria-label="back"
                            sx={{ color: '#1d4d71' }}
                            size="large"
                            onClick={setEmployeeBack}>
                            <ArrowBackIosIcon />

                        </IconButton>

                        {`Employee: ${GetPropertyValue(employeelist.at(employee), "userID")} Start time:  ${GetPropertyValue(employeelist.at(employee), "startTime")} End time: ${GetPropertyValue(employeelist.at(employee), "endTime")} `}
                        <IconButton
                            aria-label="forward"
                            sx={{ color: '#1d4d71' }}
                            size="large"
                            onClick={setEmployeeForward}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Typography>


                    {tasks.map((task, index) => (
                        <div key={index}>
                            <EmployeeCard
                                name={task.name}
                                time={task.time}
                                clicked={false}
                                setClicked={false}
                            />
                        </div>
                    ))}
                </Grid>


            </Grid>
        </div>
    );
}
