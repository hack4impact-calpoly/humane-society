const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const signup = require('./src/signup');
const login = require('./src/login');
const users = require('./src/users.js');

app.use('/signup', signup);
app.use('/login', login);
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hi from Woods Humane Society!');
});

app.listen(3001);
