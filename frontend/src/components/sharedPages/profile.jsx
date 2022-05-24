/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */

import {
  Button, IconButton, TextField, Typography,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useEffect } from 'react';
import '../../css/profile.css';
import TaskBar from '../TaskBar/taskbar';
import AdminTaskbar from '../TaskBar/adminTaskbar';

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
  const [isAdmin, setIsAdmin] = useState(false);

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

  const getIsAdmin = async () => {
    try {
      const body = {
        token: localStorage.getItem('token'),
        userID: localStorage.getItem('userID'),
      };
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}getUsers/isAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const admin = await response.json();
      setIsAdmin(admin);
    } catch {
      console.log('Error in finding isAdmin');
      setIsAdmin(false);
    }
  };

  async function updateProfile() {
    setEdit(false);
    const updateProfileBody = {
      token: localStorage.getItem('token'),
      userID: localStorage.getItem('userID'),
      phone,
      firstName,
      lastName,
      email,
    };
    fetch('http://localhost:3001/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProfileBody),
    });
  }

  async function getProfile() {
    const profileBody = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('userID'),
    };
    const response = await fetch('http://localhost:3001/getUsers/getUserById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileBody),
    });
    const res = await response.json();
    setFirstName(res.firstName);
    setLastName(res.lastName);
    setEmail(res.email);
    setPhone(res.phone);
    setSchool(res.school);
  }

  useEffect(() => {
    getProfile();
    getIsAdmin();
  }, []);

  return (
    <div>
      {isAdmin ? <AdminTaskbar /> : <TaskBar /> }
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
        <Typography className="profileText">Name:</Typography>
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
        <Typography className="profileText">Email:</Typography>
        <TextField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: '41%' }}
          disabled={!edit}
          size="small"
        />
        <Typography className="profileText">Phone:</Typography>
        <TextField
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ width: '41%' }}
          disabled={!edit}
          size="small"
        />
        <Typography className="profileText">Student:</Typography>
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
                onClick={() => updateProfile()}
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
