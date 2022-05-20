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
import AdminTaskCard from './adminTaskCard';
import moment from 'moment';
import { Button, Box } from '@mui/material/';
import { TextField } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AdminTaskBar from './TaskBar/adminTaskbar';
import '../css/tasks.css';

export default function Task() {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [makeTask, setMakeTask] = useState(false);

    let [employee, setEmployee] = useState(0);
    let [employeelist, setEmployeeList] = useState([]);
    let [userName, setUserName] = useState(new Object());
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');

    const getGetTasksForUser = async () => {
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);
        const loginBody = {
            token: localStorage.getItem("token"),
            userID: GetPropertyValue(employeelist.at(employee), "userID"),
            startDate: startDate.toISOString().slice(0, -1) + '+00:00',
            endDate: endDate.toISOString().slice(0, -1) + '+00:00'
        };

        const response = await fetch('http://localhost:3001/task/getTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status == 200) {
            const data = await response.json();

            setTasks(data)

        } else {
            console.log("could not get users")
        }
    }


    const getUsersByID = async () => {

        const loginBody = {
            token: localStorage.getItem("token"),
            id: GetPropertyValue(employeelist.at(employee), "userID")
        };

        const response = await fetch('http://localhost:3001/getUsers/getUserById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status === 200) {
            setUserName(await response.json())
        } else {
            console.log("could not get users")
        }
    }

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

            if (employeelist.length > 0) {

                getUsersByID()
                getGetTasksForUser()
            }
            else {
                setUserName(new Object());

            }


        } catch (err) {
            console.log(err);
        }
    };




    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const setDateBack = () => {
        setEmployee(0);
        setTasks([]);

        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        setDate(yesterday);

    };

    const setDateForward = () => {
        setEmployee(0);
        setTasks([]);
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow);
    };

    const setEmployeeForward = () => {
        if (employee < employeelist.length - 1) {
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
    const onCreateTaskClick = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setNotes('');
        setTitle('');

    };

    const backendCreateTask = async () => {
        // create task here
        const loginBody = {
            token: localStorage.getItem("token"),
            title: title,
            description: notes
        };
        const response = await fetch('http://localhost:3001/task/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status === 200) {
            const data = await response.json();
            console.log("task created")

            const loginBodySchedule = {
                token: localStorage.getItem("token"),
                _id: GetPropertyValue(employeelist.at(employee), "_id"),
                taskID: data
            };
            const responseSchedule = await fetch('http://localhost:3001/schedule/updateScheduleTasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginBodySchedule),
            })
            if (responseSchedule.status === 200) {
                console.log("updated")

            } else {
                console.log("could not update schedule")
            }

        } else {
            console.log("could not create task")
        }




        setMakeTask(false);


    };

    const createTask = () => {
        if (title != '' && notes != '') // you need a title
        {
            backendCreateTask()
            setMakeTask(true)
        }
        handleClose();

    };

    useEffect(() => {
        if (makeTask == true) {
            backendCreateTask();

        }
    }, []);

    useEffect(() => {

        getSchedulesForDay()

    }, [userName]);

    useEffect(() => {
        // fetch date's tasks and update state
        // setTasks(testTasks);

    }, [date]);


    function GetPropertyValue(obj1, dataToRetrieve) {
        return dataToRetrieve
            .split('.') // split string based on `.`
            .reduce(function (o, k) {
                return o && o[k]; // get inner property if `o` is defined else get `o` and return
            }, obj1) // set initial value as object
    }


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

                    <LocalizationProvider wrapperClassName="datepicker" dateAdapter={AdapterDateFns}>
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

                        {`Employee: ${GetPropertyValue(userName, "firstName")} ${GetPropertyValue(userName, "lastName")} Start time:  ${moment(GetPropertyValue(employeelist.at(employee), "startTime")).format(' h:mm a')} End time: ${moment(GetPropertyValue(employeelist.at(employee), "endTime")).format(' h:mm a')} `}
                        <IconButton
                            aria-label="forward"
                            sx={{ color: '#1d4d71' }}
                            size="large"
                            onClick={setEmployeeForward}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>

                    </Typography>
                    <Box
                        m={1}
                        //margin
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Button
                            onClick={onCreateTaskClick}
                            variant="contained"

                            style={{
                                borderRadius: 8,
                            }}
                            color="secondary"
                        >
                            + New Task
                        </Button>
                    </Box>

                    {tasks.map((task, index) => (
                        <div key={index}>
                            <AdminTaskCard
                                name={task.title}
                                description={task.description}
                            />
                        </div>
                    ))}
                </Grid>

                <Dialog maxWidth='lg' open={open} onClose={handleClose}>
                    <DialogContent style={{ width: 500 }}>
                        <Grid
                            container
                            className="body"
                            direction="column"
                            justifyContent="space-between"
                        >

                            <Grid item>
                                <TextField
                                    id="title"
                                    label="Insert task title"
                                    multiline
                                    fullWidth
                                    rows={1}
                                    sx={{ paddingBottom: 3 }}
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value); }}
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    id="notes"
                                    label="Insert task notes"
                                    multiline
                                    fullWidth
                                    rows={6}
                                    sx={{ paddingBottom: 3 }}
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
                                    onClick={createTask}
                                    style={{
                                        borderRadius: 5,
                                        minWidth: '120px',
                                    }}
                                >
                                    <b>Create</b>
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Grid>
        </div>
    );
}
