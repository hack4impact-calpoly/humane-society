/* eslint-disable */
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import '../css/contacts.css';

const columns = [
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "phoneNumber", headerName: "phone number", flex: 1 }
];
const rows = [
    { id: 0,name: 0, email: "Task 1", phoneNumber: 20 },
    { id: 1, name: 1, email: "Task 2", phoneNumber: 40 },
    { id: 2, name: 2, email: "Task 3", phoneNumber: 60 }
];



export default function Availability() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
       const response = await fetch('http://localhost:3001/getUsers/getAllUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            console.log(result);
            if (result.status === 200) {
                // success
            
            } else {
                console.log('error');
            }
        });
        data = await response.json()
        console.log(data)
    }
    
    
    useEffect(() => {
        getUsers()
        console.log(users)
    }, []);


    return (
        <div className="contacts">
            <DataGrid
                autoHeight
                columns={columns}
                rows={rows}
                pageSize={5}
                autoPageSize
                
                
            />
        </div>
    );
}
