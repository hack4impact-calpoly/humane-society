/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Button, TextField, Link, Grid, Box, Typography, Container,
  FormGroup, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel,
} from '@mui/material';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../userPool';
import logo from '../imgs/signupLogo.svg';
import '../css/signup.css';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [school, setSchool] = useState('');
  const [isStudent, setIsStudent] = useState(false);

  const updateSchool = (event) => {
    setSchool(event.target.value);
    console.log(school);
  };

  const checkStudent = () => {
    setIsStudent(!isStudent);
  };

  const checkFirst = () => {
    if (firstName.length === 0) {
      setValidFirstName(true);
    } else {
      setValidFirstName(false);
    }
  };
  const checkLast = () => {
    if (lastName.length === 0) {
      setValidLastName(true);
    } else {
      setValidLastName(false);
    }
  };
  const checkEmail = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.toLowerCase().match(emailRegex) && email.length !== 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const checkPhone = () => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneNumber.match(phoneRegex) && phoneNumber.length !== 0) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  };

  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/;
    if (!password.match(passwordRegex) && password.length !== 0) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const signup = async () => {
    // if any is value is true then we know it is invalid
    if (validEmail || validFirstName || validLastName || validPhone || validPassword) {
      console.log('invalid');
      return;
    }
    // add to mongo first here

    // parse only numbers in phoneNumber
    setPhoneNumber(phoneNumber.replace(/[^0-9]/g, ''));

    userPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
        new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
        new CognitoUserAttribute({ Name: 'phone_number', Value: `+1${phoneNumber}` }), // only US numbers valid
      ],
      null,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          // navigate to next page here
        }
      },
    );
  };

  return (
    <div className="signupPage">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <img id="signupLogo" src={logo} alt="logo" />
          </Grid>
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <FormGroup>
            <FormControlLabel id="student" control={<Checkbox />} label="I am a student" onChange={checkStudent} />
            {isStudent
              ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">School</InputLabel>
                  <Select
                    value={school}
                    label="School"
                    onChange={updateSchool}
                  >
                    <MenuItem value="Cal Poly, San Luis Obispo">Cal Poly, San Luis Obispo</MenuItem>
                    <MenuItem value="Cuesta College">Cuesta College</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              )
              : '' }
          </FormGroup>
          <Box component="form" noValidate onSubmit={signup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); }}
                  onBlur={checkFirst}
                  error={validFirstName}
                  helperText={validFirstName ? 'Please enter your first name' : ''}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); }}
                  onBlur={checkLast}
                  error={validLastName}
                  helperText={validLastName ? 'Please enter your last name' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  onBlur={checkEmail}
                  error={validEmail}
                  helperText={validEmail ? 'Must use a valid email' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber((e.target.value).replace(/[^0-9]/g, '')); }}
                  onBlur={checkPhone}
                  error={validPhone}
                  helperText={validPhone ? 'Must use a valid phone number' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); }}
                  onBlur={checkPassword}
                  error={validPassword}
                  helperText={validPassword ? 'Must contain at least one number, one uppercase, one lowercase, one special character and be atleast 8 characters' : ''}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Button
              onClick={signup}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              style={{
                borderRadius: 8,
              }}
            >
              Create account
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
