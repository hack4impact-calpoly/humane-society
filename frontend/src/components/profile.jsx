/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */

import { Button, IconButton, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import '../css/profile.css';
import TaskBar from './TaskBar/taskbar';
import AdminTaskbar from './TaskBar/adminTaskbar';

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState('Volunteer');
  const [lastName, setLastName] = useState('Name');
  const [email, setEmail] = useState('employee@gmail.com');
  const [phone, setPhone] = useState('(123) 456-6890');
  const [school, setSchool] = useState('Cal Poly');
  const [oldFirst, setOldFirst] = useState('');
  const [oldLast, setOldLast] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [oldPhone, setOldPhone] = useState('');
  const [oldSchool, setOldSchool] = useState('');

  function setOld() {
    setOldFirst(firstName);
    setOldLast(lastName);
    setOldEmail(email);
    setOldPhone(phone);
    setOldSchool(school);
    setEdit(true);
  }

  function resetFields() {
    setFirstName(oldFirst);
    setLastName(oldLast);
    setEmail(oldEmail);
    setPhone(oldPhone);
    setSchool(oldSchool);
    setEdit(false);
  }

  function isAdmin() {
    const admin = localStorage.getItem('isAdmin');
    if (admin == 'true') {
      return true;
    }
    return false;
  }

  return (
    <div>
      {isAdmin() ? <AdminTaskbar /> : <TaskBar /> }
      <div className="profilePage">
        <div id="pictureAndButton">
          <AccountCircleIcon sx={{ fontSize: 110 }} color="action" />
          {
            (edit === true)
              ? <div />
              : (
                <IconButton onClick={() => setOld()}>
                  <CreateIcon sx={{ fontSize: 30 }} />
                </IconButton>
              )
          }
        </div>
        <text className="profileText">Name:</text>
        <div id="nameInputs">
          <TextField
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!edit}
            size="small"
          />
          <TextField
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!edit}
            size="small"
          />
        </div>
        <text className="profileText">Email:</text>
        <TextField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: '41%' }}
          disabled={!edit}
          size="small"
        />
        <text className="profileText">Phone:</text>
        <TextField
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ width: '41%' }}
          disabled={!edit}
          size="small"
        />
        <text className="profileText">Student:</text>
        <TextField
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          sx={{ width: '41%' }}
          disabled={!edit}
          size="small"
        />
        <div id="bottomSection">
          {
            (edit === true)
              ? (
                <div id="buttonBox">
                  <Button
                    variant="outlined"
                    id="cancelButton"
                    onClick={() => resetFields()}
                    sx={{
                      borderWidth: '1px',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    id="saveButton"
                    onClick={() => setEdit(false)}
                    style={{ backgroundColor: '#4AA7AC' }}
                  >
                    Save changes
                  </Button>
                </div>
              )
              : <div />
          }
        </div>
      </div>
    </div>
  );
}
