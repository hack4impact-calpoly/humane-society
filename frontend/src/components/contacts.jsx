/* eslint-disable */
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import Taskbar from "./taskbar"
import '../css/contacts.css';

const columns = [
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "phoneNumber", headerName: "phone number", flex: 1 }
];
const rows = [
    { id: 0, name: 0, email: "Task 1", phoneNumber: 20 },
    { id: 1, name: 1, email: "Task 2", phoneNumber: 40 },
    { id: 2, name: 2, email: "Task 3", phoneNumber: 60 }
];



export default function Availability() {
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const formatUsers = () =>
    {
      /*  let rows = new Array()

        for (let i = 0; i < users.length; i++) {
            rows.push({ id: users[i].id, name: users[i].name, email: users[i].email, phoneNumber: users[i].phoneNumber})
        }
        setRows(rows)*/
    }
    const getUsers = async () => {
        const response = await fetch('http://localhost:3001/getUsers/getAllUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200)
        {
            const data = await response.json()
            console.log(data)
            setUsers(data)
        } else
        {
            console.log("could not get users")
        }
    }

  //  formatUsers()

    useEffect(() => {
        getUsers()
        console.log(users)
    }, []);


    return (
        <div>
        <Taskbar/>
        <div className="contacts">
            <DataGrid
                autoHeight
                columns={columns}
                rows={rows}
                pageSize={5}
                autoPageSize
            />
        </div></div>
    );
}
