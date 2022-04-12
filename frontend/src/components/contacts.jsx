/* eslint-disable */
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import Taskbar from "./taskbar"
import { DataGridPro, GridLinkOperator, GridToolbar } from '@mui/x-data-grid';
import '../css/contacts.css';

const columns = [
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "phoneNumber", headerName: "phone number", flex: 1 }
];
const VISIBLE_FIELDS = ['name', 'email', 'phone number'];


export default function Contacts() {
    const [rows, setRows] = useState([]);

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
                <DataGrid
                    
                    autoHeight
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    autoPageSize
                    /* stuff used for filtering */
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
