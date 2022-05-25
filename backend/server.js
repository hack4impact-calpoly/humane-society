const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const signup = require('./src/signup');
const login = require('./src/login');
const users = require('./src/getUsers');
const availability = require('./src/UpdateAvailability');
const updateProfile = require('./src/updateProfile');
const schedule = require('./src/Scheduling');
const task = require('./src/UpdateTask');
const updatePassword = require('./src/updatePw');
const requestOff = require('./src/requestOff');

app.use('/signup', signup);
app.use('/login', login);
app.use('/getUsers', users);
app.use('/availability', availability);
app.use('/updateProfile', updateProfile);
app.use('/task', task);
app.use('/schedule', schedule);
app.use('/updatePassword', updatePassword);
app.use('/requestOff', requestOff);

app.get('/', (req, res) => {
  res.send('Hi from Woods Humane Society!');
});

app.listen(3001);
