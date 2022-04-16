/* eslint-disable */
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import Taskbar from "./taskbar"
import { GridLinkOperator, GridToolbar } from '@mui/x-data-grid';
import '../css/contacts.css';

/* the columns of the contacts data grid */
const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 }
];

/* the contacts page */
export default function Contacts() {
    const [rows, setRows] = useState([]);
    /* gets a properly formatted array of users from the backend */
    const getUsers = async () => {
        const response = await fetch('http://localhost:3001/getUsers/getFormattedUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            setRows(await response.json())
        } else {
            console.log("could not get users")
        }
    }

    useEffect(() => {
        getUsers()
    });

    return (
        <div>
            <Taskbar />
            <div className="contacts">
                <h3 className="contactsTitle"> Contacts </h3>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    autoPageSize
                    disableSelectionOnClick

                    /* code used for filtering */
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    componentsProps={{
                        filterPanel: {
                            linkOperators: [GridLinkOperator.And],
                            columnsSort: 'asc',
                            filterFormProps: {
                                linkOperatorInputProps: {
                                    variant: 'outlined',
                                    size: 'small',
                                },
                                columnInputProps: {
                                    variant: 'outlined',
                                    size: 'small',
                                    sx: { mt: 'auto' },
                                },
                                operatorInputProps: {
                                    variant: 'outlined',
                                    size: 'small',
                                    sx: { mt: 'auto' },
                                },
                                deleteIconProps: {
                                    sx: {
                                        '& .MuiSvgIcon-root': { color: '#d32f2f' },
                                    },
                                },
                            },
                            sx: {
                                '& .MuiDataGrid-filterForm': { p: 2 },
                                '& .MuiDataGrid-filterForm:nth-child(even)': {
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#444' : '#f5f5f5',
                                },
                                '& .MuiDataGrid-filterFormLinkOperatorInput': { mr: 2 },
                                '& .MuiDataGrid-filterFormColumnInput': { mr: 2, width: 150 },
                                '& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
                                '& .MuiDataGrid-filterFormValueInput': { width: 200 },

                            },
                        },
                    }}
                />
            </div></div>
    );
}
