const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const signup = require('./src/signup');
const login = require('./src/login');

app.use('/signup', signup);
app.use('/login', login);

app.get('/', (req, res) => {
  res.send('Hi from Woods Humane Society!');
});

app.get('/getAllUsers', async (req, res) =>{
  const allUsers = await User.find({});
  res.json(allUsers);
});

app.get('/getUserById/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({userID: userId});
  res.json(user);
});

app.listen(3001);
