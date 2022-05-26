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
import AdminTaskCard from '../subcomponents/adminTaskCard';
import moment from 'moment';
import { Button, Box } from '@mui/material/';
import { TextField } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AdminTaskBar from '../TaskBar/adminTaskbar';
import '../../css/tasks.css';

export default function Task() {
    const [date, setDate] = useState(new Date()); // keep track of date we choose in calendar 
    const [tasks, setTasks] = useState([]); // list of tasks for specific schedule
    const [open, setOpen] = useState(false); // determines if the create task button is clicked or not so we can have the window popup
    const [openEdit, setOpenEdit] = useState(false);
    const [makeTask, setMakeTask] = useState(false); // determines if the button to finalize making the task is clicked
    const [editTask, setEditTask] = useState(false);
    let [employee, setEmployee] = useState(0); // keep track of what employee we are on
    let [employeelist, setEmployeeList] = useState([]); // list of schedules pulled from database
    let [userName, setUserName] = useState(new Object());  // user object for employee we are on (to get first/last names)
    const [title, setTitle] = useState(''); // hold new task's title 
    const [notes, setNotes] = useState(''); // hold new task's description 
    const [checked, setChecked] = useState(new Map());
    const [currTask, setCurrTask] = useState('');
    /* calls the bakend to get the tasks for a specific schedule we looking at so they are displayed on the frontend */
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

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}task/getTasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status == 200) {
            const data = await response.json();
            /* set the task list to these tasks */
            setTasks(data)

        } else {
            console.log("could not get users")
        }
    }

    /* gets a user object from the backeend based on a given userID */
    const getUsersByID = async () => {

        const loginBody = {
            token: localStorage.getItem("token"),
            id: GetPropertyValue(employeelist.at(employee), "userID") /* get the user object associated to the schedule we are looking at */
        };

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}getUsers/getUserById`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status === 200) {
            setUserName(await response.json()) /* keep track of this user object so we can pull the last/first name from it */
        } else {
            console.log("could not get users")
        }
    }

    /* pulls all the schedules on the current day we are looking at from the backend */
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
            setEmployeeList(data); /* keep track of this schedule list so we can display it */

            if (employeelist.length > 0) {
                /* if there are actual schedules returned, then get the user object associated to the schedule */
                getUsersByID()
                /* fet the tasks for that schedule/user so we can display them */
                getGetTasksForUser()
            }
            else {
                /* if this is not the case, we do not have any user objects */
                setUserName(new Object());
            }
        } catch (err) {
            console.log(err);
        }
    };

    const backendEditTask = async () => {

        const loginBody = {
            token: localStorage.getItem("token"),
            taskID: currTask,
            title: title,
            description: notes
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}task/updateTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status === 200) {
        } else {
            console.log("could not create task")
        }
        setEditTask(false); /* indicate we are done editting the task to the data base */
    };
    /* call the backend so we can make a new task in the data base with the title/description the user provided */
    const backendCreateTask = async () => {
        const loginBody = {
            token: localStorage.getItem("token"),
            title: title,
            description: notes
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}task/createTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginBody),
        })
        if (response.status === 200) {
            const data = await response.json();
            /* add this newly created task to the schedule's task list */
            /* data contains the taskID for this new task */
            const loginBodySchedule = {
                token: localStorage.getItem("token"),
                _id: GetPropertyValue(employeelist.at(employee), "_id"), /* add this task to the specific schedule we are on */
                taskID: data
            };
            const responseSchedule = await fetch(`${process.env.REACT_APP_SERVER_URL}schedule/updateScheduleTasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginBodySchedule),
            })
            if (responseSchedule.status === 200) {
                console.log("added schedule task")

            } else {
                console.log("could not add task to schedule")
            }
        } else {
            console.log("could not create task")
        }
        setMakeTask(false); /* indicate we are done adding the task to the data base */
    };


    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    /* move to prev date */
    const setDateBack = () => {
        /* reset variables */
        setEmployee(0);
        setTasks([]);
        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        setDate(yesterday);

    };

    /* move to next date */
    const setDateForward = () => {
        /* reset variables */
        setEmployee(0);
        setTasks([]);
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow);
    };

    /* move to prev employee in schedules list */
    const setEmployeeForward = () => {
        if (employee < employeelist.length - 1) {
            const next = employee + 1;
            employee += 1;
            setEmployee(next);
        }

    };
    /* move to next employee in schedules list */
    const setEmployeeBack = () => {
        const back = employee - 1;
        if (back >= 0) {
            employee -= 1;
            setEmployee(back);
        }

    };

    const getChecked = (taskID) => {
        // returns if a task is checked, false if not in checked map
        const isChecked = checked.get(taskID);
        return isChecked;
    };

    /* set open to true so the popup can display */
    const onCreateTaskClick = () => {
        setOpen(true);

    };
    const onCheckedChange = (taskID, isChecked) => {
        const temp = new Map(checked);
        if (isChecked) {
            temp.set(taskID, true);
        } else {
            temp.set(taskID, false);
        }
/*        updateStatus(taskID, isChecked);
*/
        setOpenEdit(true);
        setChecked(temp);
        setCurrTask(taskID);
        setEditTask(true);
    };

    /* close the create task popup */
    const handleClose = () => {
        setOpen(false);
        setOpenEdit(false);
        setCurrTask('');

        setNotes('');
        setTitle('');
    };

    /* capatalize the first letter in a given string and lower case the rest */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    /* create the task in the backend and then close the popup */
    const createTask = () => {
        if (title != '' && notes != '') // you need a title/notes in order for the task to be created
        {
            backendCreateTask()
            setMakeTask(true)
        }
        handleClose();

    };


    const doneEditting = () => {
        if (title != '' && notes != '') // you need a title/notes in order for the task to be created
        {
            backendEditTask()
            setMakeTask(true)
        }
        handleClose();

    };

    useEffect(() => {
        if (makeTask == true) /* only make task if variable indicates we need too */ {
            backendCreateTask();
        }
    }, []);

    useEffect(() => {
        if (editTask == true) /* only make task if variable indicates we need too */ {
            backendEditTask();
        }
    }, []);

    useEffect(() => {
        getSchedulesForDay() /* get the list of schedules for a specific day and tasks for the schedule we are on */
    }, [userName]);

    useEffect(() => {
        // fetch date's tasks
    }, [date]);



    /* get the value of a specific property of a given object */
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
                spacing={10}
            >
                {/* Calendar */}
                <Grid item lg={4} sx={{ display: { xs: 'none', md: 'none', lg: 'none', xl: 'block' } }}>
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

                    <Grid item sx={{ paddingBottom: 10 }}>

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            wrap="nowrap"
                        >
                        </Grid>
                    </Grid>

                {/* display employee schedules/tasks */}
                <Grid item lg={6} md={8} xs={8} sx={{ paddingTop: 5, paddingBottom: 3 }}>
                    <Typography
                        variant="h5"
                        style={{ fontWeight: 600 }}
                        sx={{ color: '#1d4d71' }}
                    >
                        {/* ability to click to go to different employee schedules for that day */}
                        <IconButton
                            aria-label="back"
                            sx={{ color: '#1d4d71' }}
                            size="large"
                            onClick={setEmployeeBack}>
                            <ArrowBackIosIcon />
                        </IconButton>

                        {/* see if there is a employee, if there is not then no schedules found */}
                        {GetPropertyValue(userName, "firstName") != undefined ? `${capitalizeFirstLetter(GetPropertyValue(userName, "firstName"))} ${capitalizeFirstLetter(GetPropertyValue(userName, "lastName"))}: ${moment(GetPropertyValue(employeelist.at(employee), "startTime")).format(' h:mm a')} to ${moment(GetPropertyValue(employeelist.at(employee), "endTime")).format(' h:mm a')} ` : 'No Schedules'}
                        <IconButton
                            aria-label="forward"
                            sx={{ color: '#1d4d71' }}
                            size="large"
                            onClick={setEmployeeForward}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Typography>

                    {/* new task button -> call prompt if clicked */}
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

                    {/* display all tasks for a given schedule or "no tasks" if there are no tasks */}
                    {tasks.length <= 0 ? 'No tasks' : ''}
                    {tasks.map((task, index) => (
                        <div key={index}>
                            <AdminTaskCard
                                name={task.title}
                                description={task.description}
                                taskID={task._id}
                                checked={getChecked(task._id)}
                                setChecked={onCheckedChange}

                            />
                        </div>
                    ))}
                </Grid>
                <Dialog maxWidth='lg' open={openEdit} onClose={handleClose}>
                    <DialogContent style={{ width: 500 }}>
                        <Grid
                            container
                            className="body"
                            direction="column"
                            justifyContent="space-between"
                        >
                            {/* enter title field */}
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

                            {/* enter notes field */}
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
                                {/* cancel */}
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

                                {/* actually create the task */}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={doneEditting}
                                    style={{
                                        borderRadius: 5,
                                        minWidth: '120px',
                                    }}
                                >
                                    <b>Done</b>
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>


                {/* Create task prompt window */}
                <Dialog maxWidth='lg' open={open} onClose={handleClose}>
                    <DialogContent style={{ width: 500 }}>
                        <Grid
                            container
                            className="body"
                            direction="column"
                            justifyContent="space-between"
                        >
                            {/* enter title field */}
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

                            {/* enter notes field */}
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
                                {/* cancel */}
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

                                {/* actually create the task */}
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
