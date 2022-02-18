/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */

import { Button, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import '../css/profile.css';

export default function Profile() {
  const [edit, setEdit] = useState(false);

  return (
    <div className="profilePage">
      <div id="pictureAndButton">
        <AccountCircleIcon sx={{ fontSize: 110 }} color="action" />
        {
          (edit === true)
            ? <div />
            : (
              <IconButton onClick={() => setEdit(true)}>
                <CreateIcon sx={{ fontSize: 30 }} />
              </IconButton>
            )
        }
      </div>
      <text className="profileText">Name:</text>
      <div id="nameInputs">
        <input className={edit === true ? 'editProfileInput' : 'noEditProfileInput'} type="text" placeHolder="Volunteer" readOnly={!edit} />
        <input className={edit === true ? 'editProfileInput' : 'noEditProfileInput'} type="text" placeHolder="Name" readOnly={!edit} />
      </div>
      <text className="profileText">Email:</text>
      <input className={edit === true ? 'editProfileInput' : 'noEditProfileInput'} id="profileInputs" type="text" placeHolder="volunteer@gmail.com" readOnly={!edit} />
      <text className="profileText">Phone:</text>
      <input className={edit === true ? 'editProfileInput' : 'noEditProfileInput'} id="profileInputs" type="text" placeHolder="(123) 456-6890" readOnly={!edit} />
      <div id="bottomButtonBox">
        {
          (edit === true)
            ? <Button variant="contained" id="saveButton" onClick={() => setEdit(false)} style={{ backgroundColor: '#4AA7AC' }}>Save changes</Button>
            : <div />
        }
      </div>
    </div>
  );
}
