const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var signup = require('./signup')
var login = require('./login');
const User = require('./models/user');
const { resolveSoa } = require('dns');

app.use('/signup', signup)
app.use('/login', login)

app.get('/', (req, res) => {
  res.send('Hi from Woods Humane Society!');
});

app.get('/getAllUsers', async (req, res) =>{
  const allUsers = await User.find({});
  res.send(allUsers);
});

app.get('/getUserById/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await User.find({userID: userId});
  res.send(user);
});

app.listen(3001);
